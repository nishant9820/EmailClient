import axios from "axios";

interface EmailData {
  recipient: string;
  subject: string;
  body: string;
  name: string;
  imageUris?: string[];
}

export const sendEmail = async (emailData: EmailData) => {
  const { recipient, subject, body, name, imageUris } = emailData;
  const emailPayload = {
    personalizations: [
      {
        to: [{ email: recipient }],
        subject: subject,
      },
    ],
    from: {
      email: "nishdesai676@gmail.com",
      name: name,
    },
    content: [
      {
        type: "text/plain",
        value: `Dear ${name},\n\n${body}`,
      },
    ],
  };

  return await axios.post(`${SENDGRID_API_URL}`, emailPayload, {
    headers: {
      Authorization: `Bearer ${SECRET_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
};
