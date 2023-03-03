import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { Event } from "../models/Event"

class TicketService {

    async getTicketHolders(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[getting ticket holders]', res.data)
        AppState.tickets = res.data
    }
    async createTicket(eventData) {
        const res = await api.post('api/tickets', eventData)
        logger.log('[Getting Ticket for Event!]', res.data)
        AppState.tickets.push(res.data)
        // NOTE new event ===ask===
        const foundEvent = AppState.event
        AppState.myTicket.push(foundEvent)
        foundEvent.capacity--

    }

    async removeTicket(ticketId) {
        logger.log(ticketId)
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('[Cancelling myTicket]', res.data)
        const ticketIndex = AppState.tickets.findIndex(c => c.id == ticketId)
        logger.log(ticketIndex)
        if (ticketIndex !== -1) {
            AppState.tickets.splice(ticketIndex, 1)
        }
    }

}

export const ticketService = new TicketService()