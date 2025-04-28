'use server';

import { ContactSchema } from '@/lib/validators/ContactSchema';
import nodemailer from 'nodemailer';

export const createContact = async (formData: FormData) => {
  try {
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const subject = formData.get('subject')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
      
  const parsed = ContactSchema.safeParse({ name, email, subject, message });
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: process.env.MAIL_RECEIVER_ADDRESS,
      subject: `${subject} from ${name}`,
      text: message,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error: 'Failed to send email' };
  }
};