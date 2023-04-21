import { updateBookDataProps } from "./../../../client/src/pages/main/api/API"
import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"
import DBTables from "../db/DBTables"

const router = express.Router()

router.get("/getBookListData/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.BOOK_LIST}`, (result?: any) => {
    response.send(result)
  })
})

router.get("/getBookListData/:dataNumber", (request: Request, response: Response) => {
  DBConnection.query(
    `SELECT * FROM ${DBTables.BOOK_LIST} WHERE NO = ${request.params.dataNumber}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

router.post("/deleteBookDataWithNumber/", (request: Request, response: Response) => {
  const result = [1]

  DBConnection.query(
    `DELETE FROM ${DBTables.BOOK_LIST} WHERE No = ${request.body.deleteNumber}`,
    (result?: any) => {
      response.send(result)
    },
    result
  )
})

router.post("/updateBookDataWithNumber/", (request: Request, response: Response) => {
  const requestBody: updateBookDataProps = request.body.resultData

  const result = [
    requestBody.submitData.serialNumber,
    requestBody.submitData.title,
    requestBody.submitData.author,
    requestBody.submitData.publisher,
    requestBody.submitData.canBorrow,
    requestBody.submitData.whoBorrow,
    requestBody.dataNumber,
  ]

  DBConnection.query(
    `UPDATE ${DBTables.BOOK_LIST} SET 일련번호 = ?, 도서명 = ?, 저자 = ?, 출판사 = ?, 대출가능여부 = ?, 대출인 = ? WHERE No = ?`,
    (result?: any) => {
      response.send(result)
    },
    result
  )
})

router.get("/getSumBookAmount/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT COUNT(도서명) FROM ${DBTables.BOOK_LIST}`, (result?: any) => {
    const bookAmount = Object.values(result[0])

    response.send(bookAmount[0] ? bookAmount : [0])
  })
})

router.post("/checkBorrowState/", (request: Request, response: Response) => {
  DBConnection.query(
    `SELECT * FROM ${DBTables.BOOK_LIST} WHERE 일련번호 = ${request.body.serialNumber}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

router.post("/borrowBook/", (request: Request, response: Response) => {
  const requestBody = request.body

  const result = [requestBody.canBorrow, requestBody.whoBorrow, requestBody.serialNumber]

  DBConnection.query(
    `UPDATE ${DBTables.BOOK_LIST} SET 대출가능여부 = ?, 대출인 = ? WHERE 일련번호 = ?`,
    (result?: any) => {
      response.send(result)
    },
    result
  )
})

router.post("/getFilteredBookListData/", (request: Request, response: Response) => {
  const requestBody: any = request.body

  const result = [
    requestBody.title,
    requestBody.author,
    requestBody.publisher,
    requestBody.canBorrow,
  ]

  const resultColumn = ["도서명", "저자", "출판사", "대출가능여부"]

  let query = `SELECT * FROM ${DBTables.BOOK_LIST} WHERE `
  let notEmptyResult = []

  for (let i = 0; i < result.length; i++) {
    if (result[i] !== "") {
      notEmptyResult.push(i < result.length - 1 ? `%${result[i]}%` : result[i])
      query = query.concat(`${resultColumn[i]} ${i < result.length - 1 ? " LIKE ? AND " : " = ?"}`)
    }
  }

  DBConnection.query(
    query,
    (result?: any) => {
      response.send(result)
    },
    notEmptyResult
  )
})

export default router
