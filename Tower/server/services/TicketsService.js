import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"
class TicketsService {

    // async getTicketsById(eventId) {
    //     const tickets = await dbContext.Ticket.find({ eventId })
    //         .populate('profile', 'name picture')
    //     return tickets
    // }
    async createATicket(ticketData) {

        const event = await eventsService.getEventById(ticketData.eventId)

        if (event.isCanceled) {
            throw new Forbidden('Event Is Canceled')
        }

        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate({
            path: 'event',
            populate: {
                path: 'creator tickets',
                select: 'name picture'
            }
        })
        let capacity = event.capacity
        capacity--
        return ticket
    }

}
export const ticketsService = new TicketsService()