import { Resend } from 'resend';
import { getWelcomeEmailHtml } from './template.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { from_name, from_email, phone } = req.body;

    if (!from_name || !from_email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Reese Sunshine Fan Club <management@reesewitherspoonofficial.com>',
      to: [from_email],
      subject: "Welcome to Reese's Sunshine Fan Club! ☀️",
      html: getWelcomeEmailHtml(from_name, from_email)
    });

    // Send a notification to the admin inbox (Zoho)
    await resend.emails.send({
      from: 'System Notification <management@reesewitherspoonofficial.com>',
      to: ['management@reesewitherspoonofficial.com'],
      subject: `🎉 New Fan Club Member: ${from_name}`,
      html: `
        <h2>New Sign Up!</h2>
        <p><strong>Name:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${from_email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p>This user has just been sent the automated welcome email.</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
