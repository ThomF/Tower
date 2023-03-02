import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {

    async createEvent(formData) {
        const res = await api.post('api/events', formData)
        logger.log('creating new event', res.data)
    }

    async getAllEvents() {
        const res = await api.get('api/events')
        console.log(res.data)
        const events = res.data.map(e => new Event(e))
        console.log('EVENTS', events);
        AppState.events = events
    }

    async getEventById(eventId) {
        AppState.event = null
        const res = await api.get('api/events/' + eventId)
        AppState.event = new Event(res.data)
    }
}

export const eventsService = new EventsService()