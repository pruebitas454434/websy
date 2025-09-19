const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

// Read SendGrid API key and emails from environment config
const SENDGRID_API_KEY = functions.config()?.sendgrid?.key || process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = functions.config()?.sendgrid?.sender || process.env.SENDER_EMAIL;
const RECIPIENT_EMAIL = functions.config()?.sendgrid?.recipient || process.env.RECIPIENT_EMAIL;

if (!SENDGRID_API_KEY) {
  console.warn('SendGrid API key not configured. Emails will fail until configured.');
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/**
 * Callable function to send an email when a cotizacion is created.
 * Expects payload: { cotizacionId, name, email, company, projectType, budget, message }
 */
exports.sendCotizacionEmail = functions.region('us-central1').https.onCall(async (data, context) => {
  if (!SENDGRID_API_KEY) {
    throw new functions.https.HttpsError('failed-precondition', 'SendGrid API key not configured');
  }

  const { cotizacionId, name, email, company, projectType, budget, message } = data || {};
  if (!name || !email || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  const subject = `Nueva solicitud de cotización - ${name}`;
  const textBody = `Se recibió una nueva solicitud de cotización.\n\nID: ${cotizacionId}\nNombre: ${name}\nEmail: ${email}\nEmpresa: ${company || 'N/A'}\nTipo de proyecto: ${projectType}\nPresupuesto: ${budget || 'N/A'}\n\nMensaje:\n${message}`;

  const htmlBody = `
    <p>Se recibió una nueva solicitud de cotización.</p>
    <ul>
      <li><strong>ID:</strong> ${cotizacionId}</li>
      <li><strong>Nombre:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Empresa:</strong> ${company || 'N/A'}</li>
      <li><strong>Tipo de proyecto:</strong> ${projectType}</li>
      <li><strong>Presupuesto:</strong> ${budget || 'N/A'}</li>
    </ul>
    <p><strong>Mensaje:</strong></p>
    <p>${message.replace(/\n/g, '<br/>')}</p>
  `;

  const msg = {
    to: RECIPIENT_EMAIL || SENDER_EMAIL,
    from: SENDER_EMAIL,
    subject,
    text: textBody,
    html: htmlBody
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (err) {
    console.error('Error sending email via SendGrid:', err);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});
