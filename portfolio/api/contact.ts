import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (typeof subject !== 'string' || subject.trim().length < 5) {
    return res.status(400).json({ error: 'Subject must be at least 5 characters' });
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const resend = new Resend(apiKey);

    // Send notification email to you
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'saisreenathreddyy@gmail.com',
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject.trim()}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #f9a825, #ff8f00); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">📬 New Portfolio Contact Message</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px; width: 80px;"><strong>From:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #f9a825;">${email.trim()}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">${subject.trim()}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <div style="font-size: 14px; line-height: 1.6; color: #333; white-space: pre-wrap;">${message.trim()}</div>
          </div>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 16px;">
            Sent from your portfolio website
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('Resend error:', errMsg);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
