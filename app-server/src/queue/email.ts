import { updateEmailJobStatus } from "../services/emailService";
import { mailContent } from "../utils/typeDefinition";

const Bull = require("bull");
const sgMail = require("@sendgrid/mail");

// Set SendGrid API key
sgMail.setApiKey("SENDGRID_API_KEY");

const emailQueue = new Bull("emailQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

emailQueue.process(async (job: { data: mailContent }) => {
  const { to, subject, text, html } = job.data;

  const msg = {
    to,
    from: "verified_email@example.com", // sender email
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent:", msg);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
});

emailQueue.on("completed", (job: any, result: any) => {
  console.log(`Job completed with result ${result}`);
  updateEmailJobStatus(job.jobId, {
    status: 'completed', 
    attempts: job.attemptsMade
  })
});

emailQueue.on("failed", (job: any, err: any) => {
  console.log(`Job failed with error ${err.message}`);
  updateEmailJobStatus(job.jobId, {
    status: 'failed',
    attempts: job.attemptsMade, 
    errorMessage: err.message
  });
});

export default emailQueue;
