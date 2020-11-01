import { Router } from "express"
import RegionController from "./controller"

const router = new Router()

router.route("/").get(RegionController.apiGetReegions)

export default router