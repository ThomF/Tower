import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const EventSchema = new Schema({

    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, maxLength: 200, required: true },
    description: { type: String, required: true },
    location: { type: String, maxLength: 500, required: true },
    capacity: { type: Number, maxLength: 300, required: true },
    startDate: { type: String, maxLength: 300, required: true },
    isCanceled: { type: Boolean, default: false, required: true },
    coverImg: { type: String, maxLength: 5000 },
    type: { ...basicStringType, enum: ['concert', 'convention', 'sport', 'digital'], default: 'convention' }

}, { timestamps: true, toJSON: { virtuals: true } })


EventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})
EventSchema.virtual('tickets', {
    localField: '_id',
    foreignField: 'eventId',
    count: true,
    ref: 'Ticket'
})