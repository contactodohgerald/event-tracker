
const AuthRoute = require('./authRouter');
const EventRoute = require('./eventsRouter');


const CombineRouter = (app) => {
    app.use('/api/v1/auth/', AuthRoute);
    app.use('/api/v1/event/', EventRoute);
}

module.exports = CombineRouter;