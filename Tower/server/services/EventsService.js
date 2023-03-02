import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class EventsService {


    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId)
            .populate('creator', 'name picture')

        if (!event) {
            throw new BadRequest('Invalid ID')
        }

        return event
    }
    async getAllEvents() {
        const events = await dbContext.Events.find()
            .populate('creator', 'name picture')
        return events
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)

        await event.populate('creator tickets', 'name picture')

        return event
    }

    async editEvent(eventId, eventData) {
        const foundEvent = await this.getEventById(eventId)

        foundEvent.description = eventData.description || foundEvent.description
        foundEvent.name = eventData.name || foundEvent.name

        if (foundEvent.isCanceled == true) {
            throw new Forbidden('Event is already Canceled')
        }

        await foundEvent.save()
        return foundEvent
    }

    async cancelEvent(eventId, requestId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() !== requestId) {
            throw new Forbidden('You cant cancel this event, this isnt your event')
        }


        event.isCanceled = true
        await event.save()
        return event

    }

}

export const eventsService = new EventsService()