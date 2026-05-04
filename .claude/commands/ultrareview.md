Perform an ultra-comprehensive review of the codebase or the changes on the current branch. Cover all of the following dimensions:

1. **Code Quality**: Identify dead code, duplication, naming issues, overly complex logic, and missed simplifications.
2. **Security**: Check for XSS, injection, exposed secrets, insecure defaults, and OWASP Top 10 vulnerabilities.
3. **Performance**: Flag unnecessary reflows, large asset sizes, blocking operations, or inefficient algorithms.
4. **Accessibility**: Verify ARIA attributes, keyboard navigation, color contrast, and semantic HTML.
5. **Correctness**: Look for off-by-one errors, wrong formulas, missing edge-case handling, and broken calculations.
6. **UX/UI**: Assess user flow, error messaging, mobile responsiveness, and form validation feedback.
7. **Maintainability**: Evaluate readability, separation of concerns, and whether the code will be easy to change later.

For each finding:
- State the file and line number (if applicable).
- Explain the problem clearly.
- Provide a concrete fix or recommendation.

Prioritize findings as **Critical**, **Major**, or **Minor**. End with a short summary verdict.
