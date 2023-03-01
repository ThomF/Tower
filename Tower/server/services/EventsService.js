import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class EventsService {
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)

        await event.populate('creator', 'name picture')

        return event
    }

}

export const eventsService = new EventsService()