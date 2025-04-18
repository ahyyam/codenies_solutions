'use server';

/**
 * @fileOverview Server Actions for the contact form.
 *
 * - sendContactForm - A server action that handles the contact form submission.
 */

import { Resend } from 'resend';
import { z } from 'zod';
import { contactFormSchema } from './page';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactForm(data: z.infer<typeof contactFormSchema>) {
  try {
    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `;

    const resendResult = await resend.emails.send({
      from: 'Codenies Solutions <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with your email
      subject: 'New Contact Form Submission',
      html: emailHtml,
    });

    if (resendResult.error) {
      console.error('Resend error:', resendResult.error);
      return { message: 'Failed to send email.', success: false };
    }

    console.log('Resend success:', resendResult);
    return { message: 'Email sent successfully!', success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { message: 'An unexpected error occurred.', success: false };
  }
}
