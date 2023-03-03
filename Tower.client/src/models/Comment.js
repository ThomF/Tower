import { Profile } from "./Account.js"

export class Comment {
    constructor(data) {
        this.eventId = data.eventId
        this.body = data.body
        // super(data.profile)
        this.id = data.id
        this.picture = data.creator.picture
        this.name = data.creator.name
        this.creatorId = data.creatorId
    }
}