const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const connects = require('./database/connection')

const CombineRouter = require('./routes/mainRouter')

const app = express()

// connect to mongoose
mongoose.connect(connects.MONGO_URL, { retryWrites: true, w: 'majority' })
.then(() => {
    console.log('Connected to MongoDb')
    startServer();
})
.catch(err => {
    console.error('Unable to connect to MongoDb');
    console.error(err);
});

//only start the serve if connected to the datebase
const startServer = () => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));


    //rules of the api
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    })

    //routes
    CombineRouter(app);

    //health check
    app.get('/api/v1/health/check', (req, res) => res.status(200).json({ message: 'Health Check Ok' }));

    //error handling
    app.use((req, res) => {
        const error = new Error('Not Found');
        console.log(error);

        return res.status(404).json({ message: error.message });
    });

    //start the server
    http.createServer(app).listen(connects.SERVER_PORT, () => console.log(`Server running on port ${connects.SERVER_PORT}`));

}