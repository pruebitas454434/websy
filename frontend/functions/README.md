# Firebase Cloud Function: sendCotizacionEmail

This folder contains a single Cloud Function `sendCotizacionEmail` that sends an email via SendGrid when a new quote request is saved.

Setup
1. Install Firebase CLI and login: `npm install -g firebase-tools` then `firebase login`.
2. From this `functions/` folder run `npm install` to install dependencies.
3. Configure SendGrid and sender/recipient via Firebase functions config or environment variables.

Using Firebase config (recommended):

  firebase functions:config:set sendgrid.key="YOUR_SENDGRID_KEY" sendgrid.sender="no-reply@yourdomain.com" sendgrid.recipient="ventas@yourdomain.com"

Then deploy:

  firebase deploy --only functions:sendCotizacionEmail

Local emulator (optional):

  npm run start

Notes
- The function expects payload with { cotizacionId, name, email, company, projectType, budget, message }.
- Ensure SendGrid key and sender email are valid. Some providers require verifying the sender domain/email.
