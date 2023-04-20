import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"
import DBTables from "../db/DBTables"
import { BookModel } from "../../../client/src/pages/main/models/BookModel"

const router = express.Router()

router.get("/", (request: Request, response: Response) => {
  response.send("hello world!")
})

router.get("/getBookList/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.BOOK_LIST}`, (result?: any) => {
    response.send(result)
  })
})

router.post("/insertBookData/", (request: Request, response: Response) => {
  const requestBody: BookModel = request.body

  const result = [
    requestBody.serialNumber,
    requestBody.title,
    requestBody.author,
    requestBody.publisher,
    requestBody.canBorrow,
    requestBody.whoBorrow,
  ]

  DBConnection.query(
    `INSERT INTO ${DBTables.BOOK_LIST} (일련번호,도서명,저자,출판사,대출가능여부,대출인) values(?)`,
    (result?: any) => {
      response.send(result)
    },
    [result]
  )
})

/* 삽입문, 현재 쓰이지 않음
router.post("/addUsage/", (request: Request, response: Response) => {
  const usage = request.body.data

  DBConnection.query(
    "INSERT INTO card_usage_statement (`usage`) values(?)",
    (result?: any) => {
      response.send(result)
    },
    [usage]
  )
})
*/

export default router
