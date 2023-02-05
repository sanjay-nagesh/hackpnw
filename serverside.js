const express = require("express");
const twilio = require("twilio");
const { default: next } = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const accountSid = 'your-twilio-account-sid';
const authToken = 'your-twilio-auth-token';
const client = new twilio(accountSid, authToken);

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.post("/send-message", (req, res) => {
    const { phone_number, message } = req.body;

    client.messages
      .create({
        body: message,
        from: 'your-twilio-phone-number',
        to: phone_number
      })
      .then(message => {
        console.log(message.sid);
        res.send(message);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
