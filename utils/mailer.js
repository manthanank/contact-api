const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_APP_PASS,
  },
});

/**
 * Send an email using the configured transporter
 * @param {Object} mailOptions - { to, subject, text, html }
 * @returns {Promise}
 */
function sendMail(mailOptions) {
  return transporter.sendMail({
    from: process.env.SMTP_MAIL,
    ...mailOptions,
  });
}

/**
 * Generate HTML for contact form email
 * @param {Object} param0 - { name, email, message }
 * @returns {string}
 */
function contactFormEmailTemplate({ name, email, message }) {
  return `
    <div style="max-width:520px;margin:0 auto;font-family:Arial,sans-serif;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.07);overflow:hidden;">
      <div style="background:#2d7ff9;padding:24px 0;text-align:center;">
        <h1 style="color:#fff;font-size:1.6em;margin:0;letter-spacing:1px;">Contact Notification</h1>
      </div>
      <div style="padding:28px 24px 18px 24px;">
        <h2 style="color:#2d7ff9;font-size:1.2em;margin-top:0;margin-bottom:18px;">New Contact Form Submission</h2>
        <table style="width:100%;font-size:1em;margin-bottom:18px;">
          <tr>
            <td style="font-weight:bold;padding:6px 0;width:90px;">Name:</td>
            <td style="padding:6px 0;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight:bold;padding:6px 0;">Email:</td>
            <td style="padding:6px 0;"><a href="mailto:${email}" style="color:#2d7ff9;text-decoration:none;">${email}</a></td>
          </tr>
        </table>
        <div style="margin-bottom:10px;font-weight:bold;">Message:</div>
        <div style="background:#f4f8fd;padding:16px 14px;border-radius:6px;color:#222;line-height:1.6;white-space:pre-line;">${message.replace(/\n/g, '<br>')}</div>
      </div>
      <div style="background:#f4f8fd;padding:14px 24px;text-align:center;font-size:0.95em;color:#888;">
        <p style="margin:0;">This email was sent from your contact form.<br>Do not reply directly to this message.<br><a href="https://github.com/manthanank/contact" style="color:#2d7ff9;text-decoration:none;">View Project on GitHub</a></p>
      </div>
    </div>
  `;
}

module.exports = { sendMail, contactFormEmailTemplate };