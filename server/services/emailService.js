const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendAuditEmail = async ({
  email,
  monthlySavings,
}) => {
  try {

    const highSavings =
      monthlySavings > 500;

    await resend.emails.send({
      from: "onboarding@resend.dev",

      to: email,

      subject:
        "Your AI Spend Audit Report",

      html: `
        <div style="
          font-family: Arial;
          max-width: 600px;
          margin: auto;
        ">

          <h1>
            AI Spend Audit Completed
          </h1>

          <p>
            Thanks for using AI Spend Audit.
          </p>

          <p>
            Estimated monthly savings:
            <strong>
              $${monthlySavings}
            </strong>
          </p>

          ${
            highSavings
              ? `
            <div style="
              background: #DCFCE7;
              padding: 16px;
              border-radius: 10px;
              margin-top: 20px;
            ">

              <h2>
                High Savings Opportunity
              </h2>

              <p>
                Your organization may qualify
                for discounted AI infrastructure
                credits through Credex.
              </p>

            </div>
          `
              : ""
          }

          <p style="margin-top: 30px;">
            We’ll notify you when additional
            optimization opportunities become
            available.
          </p>

        </div>
      `,
    });

  } catch (error) {
    console.error(error);
  }
};

module.exports = sendAuditEmail;