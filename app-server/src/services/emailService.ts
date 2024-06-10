import EmailJob from "../models/emailJob";
import emailQueue from "../queue/email";
import { emailJob, mailContent } from "../utils/typeDefinition";

export async function sendEmail(data: mailContent) {
  try {
    const job = await EmailJob.create({
      toEmail: data.to,
      subject: data.subject,
      body: data.text,
      status: 'completed',
      attempts: 0
    })
    // await emailQueue.add(
    //   { ...data, jobId: job.id },
    //   {
    //     attempts: 5, 
    //     backoff: 5000,
    //   }
    // );
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export async function sendBulkEmails(data: mailContent[]) {
  try {
    data.forEach(el => sendEmail(el));
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export async function updateEmailJobStatus(id: number, data: emailJob) {
  try {
    await EmailJob.update(data, {
      where: {id}
    })
  } catch(err) {
    console.log(err);
    throw err;
  }
}

