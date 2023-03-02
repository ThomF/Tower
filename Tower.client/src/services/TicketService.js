import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"

class TicketService {

    async createTicket(eventData) {
        const res = await api.post('api/tickets', eventData)
        logger.log('[Getting Ticket for Event!]', res.data)
        AppState.tickets.push(new Ticket(res.data))
        AppState.myEvents.push(new Event(res.data.event))
    }

}

export const ticketService = new TicketService()