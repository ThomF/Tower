import { Profile } from "./Account.js"

export class Comment {
    constructor(data) {
        this.body = data.body
        super(data.profile)
        this.id = data.id
    }
}