import { format, parseISO } from "date-fns";

type Email = {
  subject: string;
  recipient: string;
  body: string;
  name: string;
  timestamp: string;
};

export const generateEmailHtml = (email: Email) => {
  return `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Layout</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #000;
        background-color: #ffffff;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 30px auto;
        padding: 0;
        border: 1px solid #e0e0e0;
        background-color: #ffffff;
      }
      .header {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #e0e0e0;
      }
      .recipient-info {
        font-size: 14px;
        color: #000;
        font-weight: bold;
      }
      .email-title {
        font-size: 22px;
        font-weight: 500;
        margin: 15px;
        color: #202124;
      }
      .meta-info {
        margin: 0 15px 15px 15px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
        color: #5f6368;
      }
      .email-body {
        padding: 15px;
        font-size: 14px;
        line-height: 1.5;
        color: #202124;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/fir-auth-6de62.appspot.com/o/Email_Logo.png?alt=media&token=04d3788a-ffd7-4e1f-a9e4-21af20fdd83d"
          alt="Gmail Logo"
          class="logo"
        />
        <div class="recipient-info">${email.recipient}</div>
      </div>
      <div class="email-title">${email.subject}</div>
      <div class="meta-info">
        <div class="sender">${email.name} &lt;${email.recipient}&gt;</div>
        <div>To: ${email.recipient}</div>
        <div class="time-info">${format(
          parseISO(email.timestamp),
          "PPpp"
        )}</div>
      </div>
      <div class="email-body">${email.body}</div>
    </div>
  </body>
</html>
  `;
};
