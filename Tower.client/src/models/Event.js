
export class Event {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.updatedAt = data.updatedAt
        this.isCanceled = data.isCanceled
        this.coverImg = data.coverImg
        this.type = data.type
        this.creator = data.creator
        this.createdAt = data.createdAt
    }
}

export class ticketEvent extends Event {
    constructor(data) {
        super(data.event)
        this.ticketId = data.id

    }
}
