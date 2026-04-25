const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = async function (context, req) {
  if (!req.body || !req.body.message) {
    context.res = { status: 400, body: { error: "Missing message" } };
    return;
  }

  const { message, calculatorValues } = req.body;

  const cv = calculatorValues || {};
  const calcContext = `
The user has entered the following values into a home break-even calculator:
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
- PMI Rate: ${cv.annualPMIRate || "not set"}%/yr
- Rent Avoided: $${cv.monthlyRentSaved || "not set"}/mo
- Rent Growth: ${cv.annualRentGrowth || "not set"}%/yr
- Opportunity Cost Rate: ${cv.opportunityCostRate || "not set"}%/yr
- Annual Tax Benefit: $${cv.annualTaxBenefit || "not set"}
- Years to Display: ${cv.maxYears || "not set"}
`.trim();

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: `You are a friendly home-buying assistant embedded in a break-even calculator.
Answer questions concisely and practically. When relevant, reference the user's actual numbers from the calculator context provided.
Do not give tax or legal advice — remind users to consult a professional for those topics.
Keep answers under 200 words.`,
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
