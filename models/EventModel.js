const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
        userId: { type: String, required: true, ref: 'User' },
        eventName: { type: String, required: true },
        eventType: { type: String, default: 'private' },
        eventDate: { type: Date, default: null },
        eventTime: { type: String, default: null },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', EventSchema);