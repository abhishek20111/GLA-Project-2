const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = jwt.sign(
      { userId: userId },
      process.env.JWT_SECRET_FOR_RESET,
      { expiresIn: "1h" }
    );
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const emailContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7f7f7;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }
        .content h1 {
          font-size: 24px; /* Adjust as needed */
        }
        .content p {
          font-size: 16px; /* Adjust as needed */
        }
        .link {
          color: #007bff;
        }
        .midd {
          width: 35rem;
          overflow: auto;
        }
      </style>
    </head>
    <body>
    <div className="container">
    <div className="content">
      <h1>Click <a className="link" href="${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "VerifyEmail" : "reset-password"
    }?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }</h1>
      <p>Or copy and paste the link below in your browser:</p>
      <p className="midd"><a className="link" href="${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "VerifyEmail" : "reset-password"
    }?token=${hashedToken}">${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "VerifyEmail" : "reset-password"
    }?token=${hashedToken}</a></p>
    </div>
  </div>  
    </body>
  </html>
  
    `;

    const mailOptions = {
      from: "LearnUp@education.com",
      to: email,
      subject: subject,
      html: emailContent,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email send successfully");
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
