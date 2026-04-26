# HomeCalc — Complete Site Knowledge Base

This document is the authoritative reference for the AI assistant embedded in HomeCalc (isthishouseworthit.space). Use everything here to answer user questions in plain English with accurate, specific detail.

---

## About This Site

**HomeCalc** is a free, no-account-required suite of home-buying tools built for first-time buyers. It lives at isthishouseworthit.space and has four tools:

1. **Break-Even Calculator** — the main tool (homepage `/`)
2. **Mortgage Calculator** — `/mortgage`
3. **Affordability Calculator** — `/affordability`
4. **Buying Guide** — `/guide`

The site is a planning tool only — not financial, tax, or legal advice. All calculations happen live in the browser. No data is stored or transmitted except when the user asks a question through the AI chat.

---

## Tool 1: Break-Even Calculator (Homepage)

### What it does
Answers the core first-time-buyer question: **"If I buy this home today, how long do I need to stay before owning makes more financial sense than renting?"**

It models the true cost of ownership year by year, and compares it against renting. Two perspectives are shown:
- **Basic**: house-only math (what you put in vs. what you'd walk away with)
- **Advanced**: full rent-vs-buy comparison (adds rent avoided, subtracts what your cash could have earned if invested)

### Input Fields — Core Numbers

**Purchase Price ($)**
The total price you agree to pay for the home. This is the single most important number — everything else is calculated from it (loan amount, appreciation, selling costs, PMI threshold, etc.). Placeholder default: $600,000.

**Down Payment ($)**
The upfront cash you pay toward the purchase price. The loan amount is automatically calculated as Purchase Price − Down Payment. Key thresholds:
- Less than 20% of purchase price → PMI is required
- 20% or more → no PMI needed
Placeholder default: $120,000 (20% of $600k).

**Interest Rate (%)**
Your annual mortgage interest rate — NOT the APR. This is the rate your lender quotes you for the loan. Even a 0.25% difference on a large loan can mean tens of thousands of dollars over 30 years. Current rates as of 2025 are roughly 6–7% for 30-year fixed loans, but this varies by credit score, loan type, and market conditions. Placeholder default: 6.5%.

**Loan Term (years)**
How many years you agree to pay off the mortgage. Common choices:
- **30 years**: lower monthly payment, but you pay significantly more total interest and build equity slower
- **15 years**: higher monthly payment, but you pay far less interest and own the home outright in half the time
Placeholder default: 30 years.

**Buy Closing Costs ($)**
One-time fees paid when you close on the home purchase — separate from the down payment. Typically 2–5% of purchase price. Includes: loan origination fee, appraisal, title search, title insurance, attorney fees, prepaid interest, homeowners insurance prepayment, and escrow setup. Placeholder default: $15,000 (~2.5% of $600k).

**Annual Appreciation (%/yr)**
How much you expect the home's value to grow each year on average. The national historical average is roughly 3–4%/year, but it varies enormously by location. This directly drives the Sale Price column in the table. A higher appreciation rate pushes break-even earlier. Placeholder default: 3%.

### Input Fields — Ongoing Costs

**Selling Costs (%)**
When you eventually sell, you pay fees — primarily real estate agent commissions (typically 5–6%) plus transfer taxes and other closing costs. Enter as a percentage. This is applied to the sale price to calculate Selling Costs in the table, which is then subtracted from sale proceeds to calculate Cash Back. Placeholder default: 7%.

**Property Tax ($/yr)**
Your estimated annual property tax bill in dollars. Typically 0.5–2% of home value per year depending on your state and county. For example, a $600,000 home in a 2% tax area = $12,000/year. Check your county assessor's website for your specific rate. Placeholder default: $12,000/yr.

**Insurance ($/yr)**
Annual homeowners insurance premium. Typically $1,000–$3,000/year for most homes, varying by location, home age, and coverage. Required by lenders while you have a mortgage. Placeholder default: $2,500/yr.

**Maintenance ($/yr)**
Annual cost to maintain and repair the home. A widely-used rule of thumb is 1% of home value per year — so $6,000/year for a $600k home. Older homes, harsh climates, and larger properties may cost significantly more. This is one of the most commonly underestimated costs by first-time buyers. Placeholder default: $6,000/yr.

**HOA ($/mo)**
Monthly homeowners association fee, if applicable. HOA fees cover shared amenities (pool, gym, landscaping, exterior maintenance in condos). Ranges from $0 (no HOA) to $500+/month. Placeholder default: $0.

**PMI — Private Mortgage Insurance ($/mo)**
Required when your down payment is less than 20% of the purchase price (i.e., loan-to-value ratio exceeds 80%). PMI protects the lender — not you — if you default. Typically $50–$300/month depending on loan size and credit score. **Important behavior in this calculator**: PMI is entered as a fixed monthly dollar amount, and it automatically stops being counted once your loan balance drops to 80% of the original purchase price (standard PMI cancellation threshold). The calculator shows the estimated year PMI drops off in the field hint. Placeholder default: $200/mo.

**Years to Display**
How many years of results to show in the year-by-year table. Maximum is 30. Use a shorter number (like 10–15) to focus on a realistic ownership horizon. Placeholder default: 15.

### Input Fields — Advanced Settings (collapsible section)

These fields are used to calculate Advanced Net and Advanced Break-Even.

**Rent Avoided ($/mo) — also called "Rent Saved"**
The monthly rent you would have paid if you didn't buy. This is one of the biggest benefits of homeownership — every month you own, you're avoiding this payment. The calculator compounds this by the Rent Growth Rate each year. For an accurate comparison, use the market rent for a similar home in your target area. Placeholder default: $2,500/mo.

**Rent Increase (%/yr) — also called "Annual Rent Growth"**
How much you expect rent to rise each year. Historical US average is roughly 3–4%/year. This compounds over time, making the rent-savings benefit larger in later years. Placeholder default: 3%.

**Opportunity Cost Rate (%/yr)**
What your down payment + closing costs could have earned if invested in index funds instead of being tied up in the home. The default of 6% represents a conservative estimate of long-run US stock market (S&P 500) returns after inflation. A higher opportunity cost rate makes buying harder to "beat" because your cash could work harder elsewhere. This is subtracted from Advanced Net to give a fair rent-vs-buy comparison. Placeholder default: 6%.

**Annual Tax Benefit ($)**
The estimated dollar value of your mortgage interest tax deduction per year. This only applies if you itemize deductions (many homeowners no longer do after the 2017 Tax Cuts and Jobs Act raised the standard deduction). Consult a tax professional for your situation. Most users should leave this at $0 unless they know they itemize. Placeholder default: $0.

### Output — Key Metrics (shown prominently)

**Monthly Payment**
The monthly principal + interest (P&I) only. Does NOT include property taxes, insurance, maintenance, HOA, or PMI — those are tracked separately in the table. Formula: standard mortgage amortization formula based on loan amount, interest rate, and term.

**Basic Break-Even**
The first year at which Basic Net turns positive. Before this point, buying has cost you more than you'd get back from selling (accounting only for the house itself). Format: "Xy Ym" (e.g., "7y 4m").

**Advanced Break-Even**
The first year at which Advanced Net turns positive. This is usually earlier than Basic because rent savings add up in your favor every month. This is the more complete and meaningful break-even for most buyers.

**Advanced Net @ 5 Years**
A quick pulse-check: what the Advanced Net value is at exactly 5 years. Positive = buying was already ahead of renting at 5 years. Negative = you're still in the hole at 5 years. Color-coded green (positive) or red (negative).

### Output — Year-by-Year Table Columns

**Year**
The point at which you hypothetically sell, after owning for that many full years.

**Sale Price**
Estimated future home value: Purchase Price × (1 + appreciation%)^(years). Grows every year.

**Loan Balance**
Remaining mortgage principal at the time of sale, calculated via standard amortization.

**Selling Costs**
Sale Price × Selling Cost %. Represents agent commissions, transfer taxes, and other fees paid when selling.

**Interest Paid**
Cumulative mortgage interest paid from month 1 up to that year. Important: principal is NOT included here because it comes back to you as Cash Back. Including it would double-count.

**Taxes + Ins. + Maint. + HOA + PMI**
Running total of all recurring ownership costs outside of principal and interest:
- Property tax (prorated monthly)
- Insurance (prorated monthly)
- Maintenance (prorated monthly)
- HOA (monthly × months)
- PMI (monthly × months, only while loan balance > 80% of purchase price)

**Cash Back**
What you'd walk away with after selling: Sale Price − Selling Costs − Remaining Loan Balance. This is your equity check at time of sale.

**Rent Saved**
Cumulative rent you avoided by owning, with annual rent growth compounding each year. Counts as a benefit in the Advanced calculation.

**Opportunity Cost (Opp. Cost)**
What your upfront cash (down payment + closing costs) could have grown to if invested instead: Upfront Cash × ((1 + rate/12)^months − 1). Default 6%. Counts as a cost in the Advanced calculation.

**Tax Benefit**
Annual Tax Benefit ÷ 12 × months. Counts as a benefit in the Advanced calculation.

**Basic Net**
The house-only result: Cash Back − Down Payment − Closing Costs − Interest Paid − Other Costs. When positive, the house itself has paid off. Color-coded green (positive) or red (negative).

**Advanced Net**
The complete rent-vs-buy result: Basic Net + Rent Saved + Tax Benefit − Opportunity Cost. When positive, buying has beaten renting over that timeframe. This is the most important metric for most users.

### Important Calculation Notes

- The Monthly Payment shown is P&I only. Your real monthly housing cost includes taxes, insurance, HOA, and possibly PMI on top.
- PMI cancels automatically in the calculator when loan balance drops to 80% of the original purchase price, consistent with standard lender practice.
- Opportunity cost uses compound growth (monthly compounding), not simple interest.
- Rent savings use year-based compounding (rent grows once per year, not monthly).
- The calculator does NOT account for: utilities, renovations, moving costs, HOA special assessments, seller concessions, or changes in tax law.

---

## Tool 2: Mortgage Calculator (`/mortgage`)

### What it does
Shows your exact monthly P&I payment, the full year-by-year amortization schedule, and the total interest cost over the life of your loan. Supports an extra monthly payment to model paying off faster.

### Input Fields

**Home Price ($)**
Total purchase price of the home. Default: $600,000.

**Down Payment ($)**
Upfront cash. Loan = Home Price − Down Payment. Default: $120,000.

**Interest Rate (%)**
Annual mortgage interest rate. Default: 6.5%.

**Loan Term (years)**
Mortgage length. Default: 30.

**Extra Payment ($/mo)**
Additional principal paid each month beyond the required payment. Even $100–$200/month extra can shave years off a 30-year mortgage and save tens of thousands in interest. Default: $0.

**Years to Display**
Number of rows to show in the amortization table. Default: 30.

### Output Metrics

**Monthly P&I**
Required monthly payment (principal + interest only).

**Total Interest**
Total interest paid over the entire loan — this is often more than the loan itself on a 30-year mortgage and is a common eye-opener for first-time buyers.

**Total Cost**
Loan Amount + Total Interest = total you'll pay the lender.

**Payoff**
When the loan is fully paid off, accounting for any extra payments. Format: "Xy Ym".

### Amortization Table Columns

**Year** — Calendar year number from loan start.

**Annual Payment** — Total P&I paid in that year.

**Principal Paid** — How much the loan balance shrank that year. This is real equity being built.

**Interest Paid** — Cost of borrowing that year. This number starts high and shrinks every year as the balance falls.

**Cum. Interest** — Running total of all interest paid since day one.

**Remaining Balance** — What you still owe at end of that year. If you sell above this, you walk away with equity.

**Equity %** — Percentage of the original loan you've paid down. Shown with a visual progress bar.

### Key insight on amortization
In the early years of a 30-year mortgage, the vast majority of each payment goes to interest — not principal. For example, on a $480,000 loan at 6.5%, roughly 80% of Year 1 payments is interest. This flips in later years. The extra payment feature directly attacks the principal, which is why even modest extra payments have an outsized effect on payoff time.

---

## Tool 3: Affordability Calculator (`/affordability`)

### What it does
Answers: **"How much home can I afford based on my income and debts?"** Uses the industry-standard DTI (Debt-to-Income) ratio framework and three scenarios — Conservative, Moderate, Aggressive — so the user can see their realistic range.

### What is DTI?
DTI = total monthly debt payments ÷ gross monthly income. Lenders use this to decide how much new debt you can carry.

Two types:
- **Front-end DTI**: housing payment only (PITI) ÷ gross monthly income
- **Back-end DTI**: (PITI + all other monthly debts) ÷ gross monthly income

The tighter of the two constraints determines your maximum home price.

### Input Fields

**Annual Gross Income ($)**
Pre-tax household income per year. Used to calculate gross monthly income (÷12). Default: $120,000.

**Monthly Debts ($)**
All existing monthly debt obligations: car loans, student loans, credit card minimums, personal loans, etc. This affects your back-end DTI. Do NOT include the potential mortgage payment — that's calculated. Default: $500.

**Down Payment ($)**
Cash you can put toward the purchase. Max Home Price = Max Loan + Down Payment. Default: $60,000.

**Interest Rate (%)**
Expected mortgage rate for the loan. Default: 6.5%.

**Loan Term (years)**
Mortgage length. Default: 30.

**Property Tax (%/yr)**
Annual property tax as a percentage of home price. Typical range: 0.5%–2.5%. Default: 1.2%.

**Home Insurance ($/yr)**
Annual homeowners insurance. Default: $2,400.

**HOA ($/mo)**
Monthly HOA fees, if any. Default: $0.

### The Three Scenarios

**Conservative — 28% / 36% DTI**
The traditional rule recommended by financial planners. Housing costs ≤ 28% of gross income (front-end), all debts ≤ 36% (back-end). Leaves the most financial cushion. Ideal for first-time buyers with limited savings buffer or variable income.

**Moderate — 31% / 43% DTI**
FHA (Federal Housing Administration) guidelines. The most commonly used threshold in today's mortgage market. The calculator highlights this scenario in the payment breakdown section because it represents the most common real-world scenario.

**Aggressive — 36% / 50% DTI**
The maximum most conventional lenders will approve. Very little financial cushion — any unexpected expense (job loss, medical bill, car repair) becomes stressful. Not recommended as a target, but shown so users understand their ceiling.

### Output

**Max Home Price per scenario**
The maximum purchase price each DTI level allows, accounting for taxes, insurance, and HOA as part of PITI. Calculated iteratively because property tax depends on home price, which depends on max loan, which depends on PITI, which includes property tax.

**Scenario Comparison Table**
Shows for each scenario: Front/Back DTI limits, Max PITI, P&I payment, Max Loan, and Max Home Price.

**Monthly Payment Breakdown (Moderate scenario)**
Breaks down the total monthly housing cost into:
- Principal & Interest
- Property Tax
- Home Insurance
- HOA
- Total PITI

Also shows your actual front-end and back-end DTI under the moderate scenario.

### What PITI means
PITI = Principal + Interest + Taxes + Insurance (+ HOA). This is the full monthly housing cost lenders evaluate, not just the mortgage payment.

---

## Tool 4: First-Time Buyer Guide (`/guide`)

### What it covers
A practical, no-fluff reference for first-time buyers covering the full process, key numbers, glossary, tips, and common mistakes. No calculator — just education.

### The 10-Step Buying Process

1. **Check Your Credit & Finances** — Pull credit report, resolve errors. Most conventional loans need 620+ score; best rates start at 740+.
2. **Set a Realistic Budget** — Use 28/36 DTI as a ceiling, not a target. Factor all costs.
3. **Save for Down Payment & Closing Costs** — Aim for 20% down + 2–5% for closing costs.
4. **Get Pre-Approved for a Mortgage** — Lender verifies income/assets/credit and issues pre-approval letter.
5. **Find a Buyer's Agent** — Represents your interests; typically paid by the seller.
6. **Search for Homes** — Define must-haves vs. nice-to-haves; research school districts, flood zones.
7. **Make an Offer** — Includes price, contingencies (inspection, financing, appraisal), earnest money (1–3%).
8. **Schedule a Home Inspection** — Licensed inspector examines structure, roof, systems. Never skip.
9. **Secure Final Mortgage Approval** — Underwriter issues "clear to close." No major purchases during this period.
10. **Close on Your Home** — Sign documents, pay down payment + closing costs, receive keys.

### Key Benchmark Numbers

| Benchmark | Value | Meaning |
|---|---|---|
| Ideal Down Payment | 20% | Avoids PMI |
| Conservative DTI | 28/36 | Traditional guideline |
| Min Credit Score | 620+ | For conventional loans |
| Best Rate Credit Score | 740+ | Where rates improve significantly |
| Closing Costs | 2–5% | Of purchase price |
| Annual Maintenance | 1% | Of home value per year |
| Emergency Fund | 3–6 months | Keep liquid after closing |
| FHA Minimum Down | 3.5% | For buyers with 580+ credit score |
| Typical Ownership Horizon | 5+ years | Usually needed for buying to make sense |

### Glossary of Key Terms

**APR (Annual Percentage Rate)** — The true yearly cost of borrowing, including interest AND fees. Always compare APR — not just interest rate — when shopping lenders. The APR is always higher than the interest rate.

**DTI (Debt-to-Income Ratio)** — Monthly debt obligations ÷ gross monthly income. Front-end = housing only; back-end = housing + all debts.

**LTV (Loan-to-Value)** — Loan amount ÷ appraised value. LTV above 80% usually triggers PMI. Lower LTV = lower risk for lenders = better rates.

**PMI (Private Mortgage Insurance)** — Monthly premium when down payment < 20%. Protects the lender, not the buyer. Typically 0.5–1.5% of the loan per year (~$50–$300/month).

**Escrow** — A third-party account that holds funds for taxes and insurance. Collected monthly as part of the mortgage payment and disbursed when bills are due. Most lenders require an escrow account.

**Closing Costs** — Fees paid at settlement: loan origination, appraisal, title search, title insurance, prepaid interest, prepaid insurance, and more. Budget 2–5% of purchase price.

**Earnest Money** — A good-faith deposit (1–3% of purchase price) submitted with the offer. Applied to down payment at closing, or forfeited if the buyer backs out without a valid contingency.

**Pre-Approval vs. Pre-Qualification** — Pre-qualification is a quick estimate with no verification. Pre-approval involves verified income, assets, and credit — a much stronger signal to sellers. Always get pre-approved before making offers.

**Contingency** — A condition that must be satisfied for the purchase to proceed. Common: home inspection contingency, financing contingency, appraisal contingency. These protect the buyer's earnest money.

**Title Insurance** — Protects against ownership disputes, outstanding liens, or errors in public records. There are two types: lender's policy (required) and owner's policy (recommended).

**Appraisal** — An independent home valuation ordered by the lender. If the appraised value comes in below the purchase price, you may need to renegotiate, cover the gap in cash, or walk away.

**Amortization** — The gradual payoff of a loan through regular payments. Early payments are mostly interest; later payments shift toward principal as the balance falls. The mortgage calculator shows this year by year.

**PITI** — Principal + Interest + Taxes + Insurance (+ HOA). The full monthly housing cost. This is what lenders evaluate for DTI, not just the P&I payment.

**Fixed-Rate Mortgage** — Interest rate stays the same for the entire loan term. Predictable payments. All three HomeCalc calculators assume a fixed-rate mortgage.

**ARM (Adjustable-Rate Mortgage)** — Rate is fixed for an initial period (e.g., 5 or 7 years), then adjusts periodically based on market rates. HomeCalc calculators do not model ARMs.

**FHA Loan** — Government-backed loan insured by the Federal Housing Administration. Allows down payments as low as 3.5% with a 580+ credit score. Requires mortgage insurance premium (MIP) regardless of down payment size.

### Tips for First-Time Buyers
- Don't buy at the maximum the bank approves — that's a ceiling, not a recommendation
- Get pre-approved before house hunting — it anchors your search and signals seriousness
- Shop at least 3 lenders — a 0.25% rate difference on a $500k loan saves $25,000+ over 30 years
- Factor in all costs — taxes, insurance, maintenance, utilities, and HOA can add $1,500–$3,000+/month beyond the mortgage payment
- Lock your rate when you have a contract — rate lock periods typically run 30–60 days
- Visit the neighborhood at different times — morning, evening, and weekend show patterns you won't see at an open house
- Look past cosmetics — paint and carpet are cheap; foundation, roof, and water damage are not
- Think about resale before you buy — location, school district, and floor plan matter more than finishes

### Common Mistakes to Avoid
- **Waiving the inspection** — One missed issue (mold, foundation crack, old wiring) can cost more than any price advantage gained
- **Buying at pre-approval ceiling** — Leaves no cushion for repairs, job changes, or life shifts
- **Large purchases before closing** — New car, furniture financing, or new credit card between offer and closing can kill loan approval by increasing DTI
- **Underestimating maintenance** — Budget at least 1% of home value annually; more for older or larger homes
- **Using only one lender** — You leave money on the table without comparison shopping
- **Letting emotion override budget** — Falling in love with a home 20% above budget causes stress or empty-handed bids
- **Ignoring HOA details** — Restrictive bylaws, underfunded reserves, and pending special assessments can create surprise costs
- **Moving cash around before applying** — Large unexplained deposits trigger underwriting scrutiny

### External Resources Referenced in the Guide
- **CFPB Owning a Home** (consumerfinance.gov) — Comprehensive, unbiased mortgage process guide
- **HUD Buying a Home** (hud.gov) — FHA loans, housing counselors, state assistance programs
- **Fannie Mae HomeView** (fanniemae.com) — Free homeownership education course; may qualify buyers for reduced PMI or assistance programs
- **Freddie Mac My Home** (freddiemac.com) — Buyer education, affordability basics, credit-building resources

---

## How the Calculators Work Together

A typical user flow:
1. Start at **Affordability Calculator** to find a realistic price range based on income
2. Move to **Mortgage Calculator** to understand the monthly payment and total interest cost
3. Go to **Break-Even Calculator** to decide if buying vs. renting makes sense for their timeline
4. Reference the **Buying Guide** to understand what the numbers and terms mean

The AI chat is currently embedded on the Break-Even Calculator page. When users mention other calculators, explain what those tools do and how to navigate to them.

---

## Frequently Asked Questions

**Q: What's the difference between Basic and Advanced break-even?**
Basic is the house-only scorecard: did the house itself pay off? Advanced adds rent savings and subtracts the opportunity cost of your invested cash — it's the complete rent-vs-buy picture. Advanced is almost always more meaningful for decision-making.

**Q: Why is my Advanced break-even earlier than Basic?**
Because rent savings count in your favor every month. If you're avoiding $2,500/month in rent, that's $30,000/year working in the "buy" column. In high-rent areas, this can make Advanced break-even significantly earlier than Basic.

**Q: What should I enter for opportunity cost rate?**
6% is the default — a conservative long-run estimate for US stock market returns. If you believe you'd invest aggressively (e.g., 8–10%), use a higher number. If you wouldn't invest at all, you could use 0%, but the comparison becomes less meaningful.

**Q: How do I estimate my property taxes?**
Look up your county assessor's website. Most list the current year's tax bill or the millage rate. For a quick estimate: multiply the home price by 1–1.5% for most US markets.

**Q: Is the monthly payment in the Break-Even Calculator the same as what I'd actually pay?**
No — the calculator shows P&I only. Your actual monthly payment to the lender will also include property tax (escrow), homeowners insurance (escrow), and PMI if applicable. Add the Property Tax and Insurance values from your inputs divided by 12 to get a closer estimate of your real monthly cash outlay.

**Q: Why does the calculator show Basic Net as negative for many years?**
That's normal — and expected. For most buyers, it takes years before selling the home produces more money than was put in. The break-even tells you exactly when that flips. The national median ownership period is about 8–10 years.

**Q: What is PMI and when does it go away?**
PMI (Private Mortgage Insurance) is required when your down payment is less than 20% of the purchase price. In this calculator, it stops counting once your loan balance drops to 80% of the original purchase price — the standard lender cancellation threshold. The field hint shows the estimated year it drops off.

**Q: Should I use 15-year or 30-year mortgage?**
15-year: higher monthly payment, but you pay far less total interest (often half), build equity faster, and typically get a lower interest rate. 30-year: lower monthly payment, more cash flow flexibility, but significantly more total interest. The Mortgage Calculator lets you compare both directly.

**Q: What does "Opp. Cost" mean in the table?**
Opportunity cost is what your down payment and closing costs could have earned if invested in index funds instead of the home. It's the hidden cost of buying — your cash has to sit in a house rather than growing in the market. The default 6% represents a conservative long-run stock market return.
