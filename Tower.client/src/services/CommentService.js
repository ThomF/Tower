import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { Comment } from "../models/Comment"

class CommentService {

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log('GETTING DA COMMENTS', res.data)
        AppState.comments.push(new Comment(res.data))
    }

    async getCommentsByEvent(eventId) {
        AppState.comments = []
        const res = await api.get('api/events/' + eventId + '/comments')
        logger.log('[Getting comments by event]', res.data)

        AppState.comments = res.data.map(c => new Comment(c))
    }

    async delete(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        let comment = AppState.comments.findIndex(c => c.id == commentId)
        if (comment != -1) {
            AppState.comments.splice(comment, 1)
        }
    }

}
export const commentService = new CommentService()