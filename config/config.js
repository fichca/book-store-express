require('dotenv').config()

const config = {
    port: process.env.SERVER_PORT || 3000,
    counterUrl: process.env.COUNTER_URL || 'http://localhost:81'
}
module.exports = config;