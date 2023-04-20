import { updateCardDataProps } from "./../../../client/src/pages/main/api/API"
import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"
import DBTables from "../db/DBTables"
import { spawn } from "child_process"

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

// 안 쓰는 듯
// router.get("/getBookListDataByNumber/", (request: Request, response: Response) => {
//   DBConnection.query(
//     `SELECT * FROM ${DBTables.BOOK_LIST} WHERE NO = ${request}`,
//     (result?: any) => {
//       response.send(result)
//     }
//   )
// })

// router.post("/deleteCardUseDataWithNumber/", (request: Request, response: Response) => {
//   DBConnection.query(
//     `DELETE FROM ${DBTables.USE_DATA} WHERE No = ${request.body.deleteNumber}`,
//     (result?: any) => {
//       response.send(result)
//     }
//   )
// })

// router.post("/updateCardUseDataWithNumber/", (request: Request, response: Response) => {
//   const requestBody: updateCardDataProps = request.body.resultData

//   const result = [
//     requestBody.submitData.receiptDate,
//     requestBody.submitData.usageList[0],
//     requestBody.submitData.paymentPlace,
//     requestBody.submitData.content,
//     requestBody.submitData.paidAmount,
//     requestBody.submitData.payer[0],
//     requestBody.submitData.attendants.join(),
//     requestBody.dataNumber,
//   ]

//   DBConnection.query(
//     `UPDATE ${DBTables.USE_DATA} SET 일자 = ?, 구분 = ?, 사용처 = ?, 내용 = ?, 금액 = ?, 사용자 = ?, 비고 = ? WHERE No = ?`,
//     (result?: any) => {
//       response.send(result)
//     },
//     result
//   )
// })

router.get("/getSumBookAmount/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT COUNT(도서명) FROM ${DBTables.BOOK_LIST}`, (result?: any) => {
    const bookAmount = Object.values(result[0])

    response.send(bookAmount[0] ? bookAmount : [0])
  })
})

export default router
