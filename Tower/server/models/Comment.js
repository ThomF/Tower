import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, maxLength: 200, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
CommentSchema.virtual('event', {
    ref: 'Event',
    foreignField: '_id',
    justOne: true,
    localField: 'eventId'
})