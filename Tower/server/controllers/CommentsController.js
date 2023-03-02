import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }


    async createComment(req, res, next) {
        try {
            const comments = req.body
            comments.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(comments)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const requestorId = req.userInfo.id
            const comment = await commentsService.deleteComment(commentId, requestorId)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}