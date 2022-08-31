require('dotenv').config()

const config = {
    port: process.env.SERVER_PORT || 3000,
    counterUrl: process.env.COUNTER_URL || 'http://localhost:81',
    mongoURL: process.env.MONGO_URL || 'mongodb://root:example@localhost:8027',
}
module.exports = config;