import { Router } from "express"
import CityController from "./controller"

const router = new Router()

router.route("/").get(CityController.apiGetCities)
router.route("/region/:id").get(CityController.apiGetRegionCities)

export default router