// EmailTemplate.tsx

const generateEmailHtml = (recipient: string, subject: string, name: string, timestamp: string, body: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Layout - A4 Format</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
          }

          .page-container {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 20mm;
            border: 2px solid #333;
            box-sizing: border-box;
          }

          .header {
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 20px;
          }

          .logo {
            height: 40px;
            margin-right: 10px;
          }

          .recipient-info {
            font-size: 16px;
            color: #000;
            font-weight: bold;
          }

          .email-title {
            font-size: 22px;
            font-weight: 500;
            margin: 0 0 15px 0;
            color: #202124;
          }

          .meta-info {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #5f6368;
          }

          .sender {
            font-size: 14px;
            margin-bottom: 5px;
          }

          .time-info {
            font-size: 14px;
            color: #5f6368;
          }

          .email-body {
            font-size: 14px;
            line-height: 1.5;
            color: #202124;
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div class="header">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-auth-6de62.appspot.com/o/Email_Logo.png?alt=media&token=04d3788a-ffd7-4e1f-a9e4-21af20fdd83d"
              alt="Gmail Logo"
              class="logo"
            />
            <div class="recipient-info">${recipient}</div>
          </div>

          <div class="email-title">${subject}</div>

          <div class="meta-info">
            <div class="sender">${name} &lt;${recipient}&gt;</div>
            <div>To: ${recipient}</div>
            <div class="time-info">${timestamp}</div>
          </div>

          <div class="email-body">${body}</div>
        </div>
      </body>
    </html>
  `;
};

export default generateEmailHtml;
