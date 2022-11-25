const Validator = require('validatorjs');

const UserModel = require('../models/UserModel')
const EventModel = require('../models/EventModel')
const services = require('../config/services')

class EventController {


    async createEvent(req, res) {
        const body = req.body
       
        let validation = new Validator(body, {
            userId: "required",
            event_name: "required",
            event_date: "required|date",
            event_time: "required",                                                  
        })

        if(validation.fails())
            res.status(400).json({message: validation.errors})

        const {event_type, userId, event_name, event_date, event_time} = body
         
        const user = await UserModel.findOne({_id : userId})
        if(user){
            const events = new EventModel({
                userId: user._id,
                eventName: services.convertToLower(event_name),
                eventType: event_type,
                eventDate: event_date, 
                eventTime: event_time,
            })
    
            try {
                await events.save();
                res.status(200).json({ message: 'Event was created succeffuly World', data: events })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
        }else{
            res.status(500).json({message: "Please, provide a valid user Id"})
        }       
    }

    async getAllUserEvents(req, res){
        const userId = req.params.userId;
        try {
            const events = await EventModel.find({ userId: userId });
            if(events.length == 0){   
                res.status(404).json({ message: "No Data was returned" })
            }else{
                res.status(200).json({ message: "Data was successfully returned", data: events })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async getSingleEvent(req, res){
        const eventId = req.params.eventId;
        try {
            const events = await EventModel.findOne({ _id: eventId });
            if(events){   
                res.status(200).json({ message: "Data was successfully returned", data: events })
            }else{
                res.status(404).json({ message: "No Data was returned" })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async updateSingleEvent(req, res) {
        const body = req.body;
        const eventId = req.params.eventId;
        try {
            let validation = new Validator(body, {
                event_name: "required",
                event_date: "required|date",
                event_time: "required", 
            })
            
            if(validation.fails())
                res.status(400).json({message: validation.errors})
 
            const {event_type, event_name, event_date, event_time} = body
            
            EventModel.findOneAndUpdate({_id: eventId}, {
                eventName: services.convertToLower(event_name),
                eventType: event_type,
                eventDate: event_date, 
                eventTime: event_time,
            }, (err, event) => {
                if(err)
                    res.status(404).json({message: err})
                
                res.status(200).json({ message: "Event was successfully updated", data: event })
            });
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async deleteEvent(req, res) {
        const eventId = req.params.eventId;
        try {
            EventModel.findOneAndDelete({_id: eventId}, (err, event) => {
                if(err)
                    res.status(404).json({ message: err.message })

                res.status(200).json({ message: "Event was successfully deleted", data: event })  
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }


}

const events = new EventController

module.exports = events