const config = require('./config.json')
const axios = require('axios')
const sendMessage = require('./sms')
const cron = require('node-cron')
const storeName = config.storeName;

let task = cron.schedule('* * * * *', () => {
    console.log('Is IKEA click & collect available at your store yet?')
    let storeAvailability = axios.get('https://ikea-status.dong.st/latest.json').then((response) => {
        let data = response.data
        let dataArray = JSON.stringify(data)

        let result = data.filter(entry =>
            entry.name === storeName && entry.last_closed < entry.last_open
        )

        if (result.length === 1) {
            console.log('YES! But be fast!!! Here is your link: \n https://order.ikea.com/us/en/checkout/delivery/')
            sendMessage()
        }
        else
            console.log('No... not yet')
    })
})

task.start()


