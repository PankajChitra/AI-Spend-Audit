const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateSummary = async ({
  monthlySavings,
  annualSavings,
  recommendations,
}) => {
  try {
    const prompt = `
You are an AI infrastructure cost optimization consultant.

Analyze this startup AI tooling setup and generate
a personalized audit summary.

Team Size: ${recommendations.length}

Monthly Savings Potential: $${monthlySavings}

Annual Savings Potential: $${annualSavings}

Recommendations:
${recommendations
  .map(
    (r) =>
      `Tool: ${r.tool}
Recommendation: ${r.action}
Reason: ${r.reason}
Savings: $${r.savings}/month`
  )
  .join("\n\n")}

Requirements:
- Mention specific tools by name
- Mention savings opportunities
- Explain overspending patterns
- Keep tone professional and concise
- Maximum 100 words
`;

    const response =
      await client.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    return response.choices[0].message.content;

  } catch (error) {
  console.error(error);

  return `
Your organization could save approximately
$${monthlySavings} per month and
$${annualSavings} annually by optimizing
its AI tooling stack.

Key opportunities include:
${recommendations
  .map((r) => `- ${r.action}`)
  .join("\n")}

These changes may reduce operational AI costs
while maintaining similar productivity levels.
`;
}
};

module.exports = generateSummary;