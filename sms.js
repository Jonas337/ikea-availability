const config = require('./config.json')
const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);
const storeName = config.storeName;

sendMessage = () => {
    client.messages
        .create({
            body: 'IKEA ' + storeName +' store available for Click & Collect https://order.ikea.com/us/en/checkout/delivery/',
            from: config.fromPhoneNumber,
            to: config.toPhoneNumber
        })
        .then(message => console.log(message.sid));
}

module.exports = sendMessage