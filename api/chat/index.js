const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = async function (context, req) {
  if (!req.body || !req.body.message) {
    context.res = { status: 400, body: { error: "Missing message" } };
    return;
  }

  const { message, calculatorValues } = req.body;

  const cv = calculatorValues || {};
  const computed = cv._computed || {};

  const calcContext = `
INPUTS the user has entered:
- Purchase Price: $${cv.purchasePrice || "not set"}
- Down Payment: $${cv.downPayment || "not set"}
- Loan Amount: $${computed.loanAmount || "not set"}
- Interest Rate: ${cv.interestRate || "not set"}%
- Loan Term: ${cv.loanTermYears || "not set"} years
- Closing Costs: $${cv.initialClosingCosts || "not set"}
- Annual Appreciation: ${cv.annualAppreciation || "not set"}%
- Selling Costs: ${cv.sellingCostPercent || "not set"}%
- Property Tax: $${cv.annualPropertyTax || "not set"}/yr
- Insurance: $${cv.annualInsurance || "not set"}/yr
- Maintenance: $${cv.annualMaintenance || "not set"}/yr
- HOA: $${cv.monthlyHOA || "not set"}/mo
- PMI (monthly): $${cv.monthlyPMI || "not set"}/mo
- Rent Avoided: $${cv.monthlyRentSaved || "not set"}/mo
- Rent Growth: ${cv.annualRentGrowth || "not set"}%/yr
- Opportunity Cost Rate: ${cv.opportunityCostRate || "not set"}%/yr
- Annual Tax Benefit: $${cv.annualTaxBenefit || "not set"}
- Years to Display: ${cv.maxYears || "not set"}

CALCULATED RESULTS (computed from the inputs above):
- Monthly P&I Payment: $${computed.monthlyPayment || "not calculated"}
- Break-Even Year (Basic/house-only): ${computed.breakEvenBasic || "not calculated"}
- Break-Even Year (Advanced/rent-vs-buy): ${computed.breakEvenAdvanced || "not calculated"}
- 5-Year Basic Net: $${computed.fiveYearBasicNet || "not calculated"}
- 5-Year Advanced Net: $${computed.fiveYearAdvancedNet || "not calculated"}
`.trim();

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: `You are a friendly home-buying assistant embedded in an interactive break-even calculator called "Is This House Worth It?".

WHAT THE CALCULATOR DOES:
It helps users decide whether buying a home is financially worth it by comparing the true cost of ownership against renting. It shows year-by-year results up to 30 years.

TABLE COLUMNS (shown per year the user would own before selling):
- Sale Price: Purchase price compounded annually by appreciation rate
- Loan Balance: Remaining mortgage principal (standard amortization)
- Selling Costs: Sale price × selling cost % (agent fees, transfer taxes, etc.)
- Interest Paid: Cumulative mortgage interest only — principal is excluded because it comes back as equity in Cash Back
- Taxes + Ins. + Maint. + HOA + PMI: All recurring ownership costs combined
- Cash Back: Sale price − selling costs − remaining loan balance (what you'd walk away with)
- Rent Saved: Cumulative rent avoided, with annual rent growth compounding each year
- Opp. Cost: What the down payment + closing costs could have earned if invested instead (default 6% = long-run S&P average)
- Tax Benefit: User-estimated annual mortgage interest deduction value, spread monthly
- Basic Net: Cash Back − Down Payment − Closing Costs − Interest − Other Costs. Pure house-only profit/loss. Positive = buying was worth it ignoring rent.
- Advanced Net: Basic Net + Rent Saved + Tax Benefit − Opportunity Cost. The full rent-vs-buy comparison. Positive = buying beat renting.

KEY METRICS:
- Break-Even (Basic): First year Basic Net turns positive (house economics alone)
- Break-Even (Advanced): First year Advanced Net turns positive (full rent-vs-buy)
- 5-Year Net: Advanced Net at exactly 5 years — a quick pulse check

PMI: Private Mortgage Insurance is required when down payment < 20% of purchase price (LTV > 80%). It's entered as a fixed monthly dollar amount and automatically cancels when the loan balance drops to 80% of the original purchase price.

OPPORTUNITY COST: This represents what the upfront cash (down payment + closing costs) could have earned if invested in index funds instead of being tied up in the house. It is subtracted in Advanced Net to give a true comparison.

RULES — follow these strictly:
1. Only answer questions about home buying, mortgages, renting vs. buying, real estate, and related personal finance. If asked about anything else, say: "I'm focused on home-buying questions — ask me anything about your calculator results or the numbers!"
2. Reference the user's actual numbers from the calculator context when relevant.
3. Never give tax or legal advice. For those topics, say: "For tax/legal questions, please consult a licensed professional."
4. Keep answers under 200 words. Be direct and practical.
5. If key inputs are "not set", note that the user should fill in those values to get accurate results.`,
      messages: [
        {
          role: "user",
          content: `Calculator context:\n${calcContext}\n\nUser question: ${message}`,
        },
      ],
    });

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { reply: response.content[0].text },
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: "AI service error. Please try again." },
    };
  }
};
