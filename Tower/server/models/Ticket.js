import { Schema } from "mongoose";

export const TicketSchema = new Schema({

    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile', {
    ref: 'Account',
    localField: 'accountId',
    foreignField: '_id',
    justOne: true
})
TicketSchema.virtual('event', {
    ref: 'Event',
    foreignField: '_id',
    justOne: true,
    localField: 'eventId'
})

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })