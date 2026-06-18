export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const emailBody = `
New inquiry from Baraka Machinery website

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Subject: ${subject || 'N/A'}

Message:
${message}
    `.trim();

    const emailData = {
      to: process.env.CONTACT_EMAIL || 'kaige899@gmail.com',
      from: process.env.FROM_EMAIL || 'noreply@barakamachinery.com',
      subject: `New Inquiry from ${name}`,
      text: emailBody,
    };

    // Using nodemailer or another service here
    // For now, log to console (Vercel captures logs)
    console.log('Email would be sent:', JSON.stringify(emailData, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you shortly.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
