 const dotevn = require('dotenv');

dotevn.config()

const MONGO_URL = process.env.MONGO_URL

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;

module.exports = {
    MONGO_URL,
    SERVER_PORT
}

