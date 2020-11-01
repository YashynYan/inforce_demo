import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"

import region from "../api/region/route"
import city from "../api/city/route"
import feedback from "../api/feedback/route"

const app = express()

app.use(cors())
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ...
app.use("/api/v1/region", region)
app.use("/api/v1/city", city)
app.use("/api/v1/feedback", feedback)
// ..
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
