import express, { json, urlencoded } from "express"
import morgan from "morgan"
import cors from "cors"
import HomeRouter from "./routes/Home"
import ManagementRouter from "./routes/Management"
import path from "path/posix"

const app: express.Application = express()
const port: number = 3001

// 환경설정
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "../../buildFile/build")))

app.listen(port, () => {
  console.log(`App is listening on port ${port}! \n`)
})

// 라우터 설정
app.use("/home/", HomeRouter)
app.use("/management/", ManagementRouter)

// will serve index.html for every page refresh.
app.get("*", (request, respond) => {
  respond.sendFile(path.join(__dirname, "../../buildFile/build/index.html"))
})
