require('dotenv').config()

const config = {
    port: process.env.SERVER_PORT || 3000,
}
module.exports = config;