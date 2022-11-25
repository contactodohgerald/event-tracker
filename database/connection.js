const dotevn = require('dotenv');

dotevn.config();

const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@eventtracker.qarvlq4.mongodb.net/`;


const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;

module.exports = {
    MONGO_URL,
    SERVER_PORT
}

