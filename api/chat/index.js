const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const siteContext = fs.readFileSync(
  path.join(__dirname, "../context/site-context.md"),
  "utf-8"
);

module.exports = async function (context, req) {
  if (!req.body || !req.body.message) {
    context.res = { status: 400, body: { error: "Missing message" } };
    return;
  }

  const { message, calculatorValues } = req.body;

  const cv = calculatorValues || {};
  const computed = cv._computed || {};

  const pp = parseFloat(cv.purchasePrice);
  const dp = parseFloat(cv.downPayment);
  const loanAmount = (pp > 0 && dp >= 0) ? (pp - dp).toLocaleString() : "not set";

  const calcContext = `
INPUTS the user has entered in the Break-Even Calculator:
- Purchase Price: $${cv.purchasePrice || "not set"}
- Down Payment: $${cv.downPayment || "not set"}
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

CALCULATED RESULTS (derived automatically):
- Loan Amount (Purchase Price − Down Payment): $${loanAmount}
- Monthly P&I Payment: $${computed.monthlyPayment || "not calculated"}
- Break-Even Year (Basic): ${computed.breakEvenBasic || "not calculated"}
- Break-Even Year (Advanced): ${computed.breakEvenAdvanced || "not calculated"}
- 5-Year Basic Net: $${computed.fiveYearBasicNet || "not calculated"}
- 5-Year Advanced Net: $${computed.fiveYearAdvancedNet || "not calculated"}
`.trim();

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: [
        {
          type: "text",
          text: `You are a friendly home-buying assistant embedded in HomeCalc (isthishouseworthit.space), a free suite of tools for first-time home buyers.

COMPLETE SITE KNOWLEDGE — use this to answer any question about the site, its tools, fields, calculations, and home-buying concepts:

${siteContext}

RULES — follow these strictly:
1. Only answer questions about home buying, mortgages, renting vs. buying, real estate, and related personal finance. If asked about anything unrelated, say: "I'm focused on home-buying questions — ask me anything about your calculator results or the numbers!"
2. Reference the user's actual numbers from the calculator context when relevant.
3. Never give tax or legal advice. For those topics, say: "For tax/legal questions, please consult a licensed professional."
4. Keep answers under 250 words. Be direct and practical.
5. If key inputs are "not set", note that the user should fill in those values to get accurate results.
6. When a user asks about a field or concept, give them a clear plain-English explanation using the site knowledge above.
7. When relevant, mention other tools on the site (Mortgage Calculator, Affordability Calculator, Buying Guide) and where to find them.`,
          cache_control: { type: "ephemeral" }
        }
      ],
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
