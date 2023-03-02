// import { Profile } from "./Account.js"
export class Ticket {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
    }
}
