import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from "../services/TicketsService.js";


export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .post('', this.createATicket)
    }

    async createATicket(req, res, next) {
        try {
            const ticketData = req.body
            ticketData.accountId = req.userInfo.id
            const ticket = await ticketsService.createATicket(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

}