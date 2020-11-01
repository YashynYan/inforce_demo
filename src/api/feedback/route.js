import { Router } from "express"
import FeedbackController from "./controller"

const router = new Router()

router.route("/").get(FeedbackController.apiGetFeedbacks)
router.route("/").post(FeedbackController.apiPostFeedback)
router.route("/:id").put(FeedbackController.apiPutFeedback)
router.route("/:id").delete(FeedbackController.apiDeleteFeedback)

export default router