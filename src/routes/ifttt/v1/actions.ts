import * as Twilio from 'twilio';
import * as Express from 'express';
const router = Express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

interface ActionRequest {
  actionFields: {
    phone_number: string,
    message: string,
  };
  user: object;
  ifttt_source?: object;
}

function parsePhoneNumber(phone: string) {
  return '1' + phone.replace('-', '');
}

const validateActionFields: Express.RequestHandler = (req, res, next) => {
  let body: ActionRequest = req.body;

  let errors: { message: string }[] = [];
  if (!('actionFields' in body)) {
    errors.push({ message: 'Action fields are missing' });
  } else {
    ['phone_number', 'message'].forEach((field) => {
      if (!(field in body.actionFields)) {
        errors.push({ message: `Action field ${field} is missing` });
      };
    });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
}

router.post('/send_sms_message', validateActionFields, (req, res, next) => {
  let body: ActionRequest = req.body;
  let phoneNumber = parsePhoneNumber(body.actionFields.phone_number);
  client.messages.create({
    to: `+${phoneNumber}`,
    from: `+${process.env.TWILIO_NUMBER}`,
    body: body.actionFields.message,
  }, (err, message) => {
    if (err) {
      console.error(err);
      res.status(400).json({
        errors: [{ message: 'Unable to send SMS.' }],
      });
    } else {
      res.json({
        data: [{ id: Date.now().toString() }]
      });
    }
  });
});

export default router;
