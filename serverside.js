const express = require("express");
const twilio = require("twilio");

const app = express();

const accountSid = 'your-twilio-account-sid';
const authToken = 'your-twilio-auth-token';
const client = new twilio(accountSid, authToken);

app.use(express.json()); 
 
app.post("/send-message", (req, res) => {
  const { phone_number, message } = req.body;

  client.messages
    .create({
      body: message,
      from: 'your-twilio-phone-number',
      to: phone_numbers
    })
    .then(message => {
        console.log(message.sid);
      });
  7});