import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService.js"
import { request } from "express"
import { ticketsService } from "../services/TicketsService.js"

export class EventsController extends BaseController {

    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async getEventTickets(req, res, next) {
        try {
            const eventId = req.params.eventId
            const ticketHolders = await ticketsService.getEventTickets(eventId)
            return res.send(ticketHolders)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getAllEvents(req, res, next) {
        try {
            const events = await eventsService.getAllEvents()
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id

            const event = await eventsService.createEvent(eventData)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const eventData = req.body
            const editEvent = await eventsService.editEvent(eventId, eventData)
            return res.send(editEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requestId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, requestId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
}