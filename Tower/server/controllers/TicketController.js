import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { ticketsService } from "../services/TicketsService.js";


export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createATicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async deleteTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const requestorId = req.userInfo.id
            const leave = await ticketsService.deleteTicket(ticketId, requestorId)
            return res.send(leave)
        } catch (error) {
            next(error)
        }
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