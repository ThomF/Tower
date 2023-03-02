import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"

class CommentsService {

    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId })
            .populate('creator', 'name picture')
        return comments
    }
    async createComment(comments) {
        const event = await eventsService.getEventById(comments.eventId)

        if (event.isCanceled) {
            throw new Forbidden('Event Cancelled ')
        }

        const comment = await dbContext.Comments.create(comments)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async deleteComment(commentId, requestorId) {
        const comment = await dbContext.Comments.findById(commentId)
            .populate('creator', 'name picture')
        if (!comment) {
            throw new BadRequest('no id')
        }
        if (comment.creatorId.toString() !== requestorId) {
            throw new Forbidden('Hey! thats not yours to delete!!')
        }
        // const event = await eventsService.getEventById(comment.eventId)

        await comment.remove()
        // await event.save()
        return comment
    }
}


export const commentsService = new CommentsService()