import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, designation, organisation, email, phone, cameras, deployment, date } = req.body;

  const msg = {
    to: 'abhishek.tiwari0253@gmail.com', // Your receiving email
    from: 'abhishek.tiwari0253@gmail.com', // Must be your verified Single Sender address in SendGrid
    subject: `Vigor Sight Demo Request - ${organisation || 'Individual'}`,
    text: `Name: ${name}\nDesignation: ${designation || 'N/A'}\nOrganisation: ${organisation}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCameras: ${cameras || 'N/A'}\nPreferred Date: ${date || 'N/A'}\nDeployment: ${deployment || 'N/A'}`,
    html: `
      <h3>New Vigor Sight Demo Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Designation:</strong> ${designation || 'N/A'}</p>
      <p><strong>Organisation:</strong> ${organisation}</p>
      <p><strong>Business Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Camera Range:</strong> ${cameras || 'N/A'}</p>
      <p><strong>Preferred Date:</strong> ${date || 'N/A'}</p>
      <p><strong>Deployment Requirements:</strong></p>
      <p>${deployment || 'N/A'}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
