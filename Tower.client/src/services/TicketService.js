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
        AppState.myTicket.push(new Event(res.data.event))
        AppState.event.capacity--

    }

}

export const ticketService = new TicketService()