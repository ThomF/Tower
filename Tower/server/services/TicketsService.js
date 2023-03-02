import { dbContext } from "../db/DbContext.js"
import { EventSchema } from "../models/Event.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"
class TicketsService {

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId })
            .populate('profile', 'name picture')
        return tickets
    }

    async getMyTickets(accountId) {
        const event = await dbContext.Tickets.find({ accountId })
            .populate({
                path: 'event',
                populate: {
                    path: 'creator tickets',
                    select: 'name picture'
                }
            })
        return event
    }
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
        event.capacity--
        await event.save()
        return ticket
    }

    async deleteTicket(ticketId, requestorId) {

        const ticketHolder = await dbContext.Tickets.findById(ticketId)
        if (!ticketHolder) {
            throw new BadRequest('Invalid Id!')
        }
        const event = await eventsService.getEventById(ticketHolder.eventId)

        if (ticketHolder.accountId.toString() !== requestorId) {
            throw new Forbidden('How are you here?')
        }

        await ticketHolder.remove()
        event.capacity++
        await event.save()
        return 'No longer Attending Event'

    }


}
export const ticketsService = new TicketsService()