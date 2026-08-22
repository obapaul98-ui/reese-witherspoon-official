require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log("Using API Key starting with:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 8) + '...' : 'NONE');
  try {
    const { data, error } = await resend.emails.send({
      from: 'Reese Sunshine Fan Club <onboarding@resend.dev>',
      to: ['delivered@resend.dev'], // Use Resend's success testing address
      subject: 'Test Email',
      html: '<p>Testing Resend API</p>'
    });
    
    if (error) {
      console.error("Resend API Error:", error);
    } else {
      console.log("Success! Data:", data);
    }
  } catch (e) {
    console.error("Caught error:", e.message);
  }
}
test();
