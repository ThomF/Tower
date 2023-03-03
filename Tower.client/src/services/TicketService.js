import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { Event } from "../models/Event"

class TicketService {

    async getTicketHolders(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[getting ticket holders]', res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
    }
    async createTicket(eventData) {
        const res = await api.post('api/tickets', eventData)
        logger.log('[Getting Ticket for Event!]', res.data)
        AppState.tickets.push(new Ticket(res.data))
        // NOTE new event ===ask===
        AppState.myTicket.push(new ticketEvent(res.data))
        AppState.event.capacity--

    }

    async removeTicket(myTicket) {
        const res = await api.delete(`api/tickets/${myTicket}`)
        logger.log('[Cancelling myTicket]', res.data)
        const ticketIndex = AppState.myTicket.findIndex(c => c.eventId == myTicket)
        if (eventId !== -1) {
            AppState.myTicket.splice(ticketIndex, 1)
        }
    }

}

export const ticketService = new TicketService()