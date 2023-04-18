import { updateCardDataProps } from "./../../../client/src/pages/main/api/API"
import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"
import DBTables from "../db/DBTables"
import { spawn } from "child_process"

const router = express.Router()
const LAST_MONTH = new Date().getMonth()

router.get("/getCardUseData/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.USE_DATA}`, (result?: any) => {
    response.send(result)
  })
})
router.get("/getCardUseData/:dataNumber", (request: Request, response: Response) => {
  DBConnection.query(
    `SELECT * FROM ${DBTables.USE_DATA} WHERE NO = ${request.params.dataNumber}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

router.get("/getCardUseDataByNumber/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.USE_DATA} WHERE NO = ${request}`, (result?: any) => {
    response.send(result)
  })
})

router.post("/deleteCardUseDataWithNumber/", (request: Request, response: Response) => {
  DBConnection.query(
    `DELETE FROM ${DBTables.USE_DATA} WHERE No = ${request.body.deleteNumber}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

router.post("/updateCardUseDataWithNumber/", (request: Request, response: Response) => {
  const requestBody: updateCardDataProps = request.body.resultData

  const result = [
    requestBody.submitData.receiptDate,
    requestBody.submitData.usageList[0],
    requestBody.submitData.paymentPlace,
    requestBody.submitData.content,
    requestBody.submitData.paidAmount,
    requestBody.submitData.payer[0],
    requestBody.submitData.attendants.join(),
    requestBody.dataNumber,
  ]

  DBConnection.query(
    `UPDATE ${DBTables.USE_DATA} SET 일자 = ?, 구분 = ?, 사용처 = ?, 내용 = ?, 금액 = ?, 사용자 = ?, 비고 = ? WHERE No = ?`,
    (result?: any) => {
      response.send(result)
    },
    result
  )
})

router.get("/getSumPaidAmount/:currentUsage", (request: Request, response: Response) => {
  if (request.params.currentUsage === "전체") {
    DBConnection.query(`SELECT SUM(금액) FROM ${DBTables.USE_DATA}`, (result?: any) => {
      const paidAmount = Object.values(result[0])

      response.send(paidAmount[0] ? paidAmount : [0])
    })
  } else {
    DBConnection.query(
      `SELECT SUM(금액) FROM ${DBTables.USE_DATA} WHERE 구분 = '${request.params.currentUsage}'`,
      (result?: any) => {
        const paidAmount = Object.values(result[0])

        response.send(paidAmount[0] ? paidAmount : [0])
      }
    )
  }
})

router.get("/downloadXSLX/", (request: Request, response: Response) => {
  const pythonDirection: string = `sql_pyxl_dgcard_use.py`
  const fileToDownload: string = `${LAST_MONTH}월_기술본부_법인카드사용내역서.xlsx`
  const python = spawn("python3", [pythonDirection])
  python.on("close", (code) => {
    response.download(fileToDownload)
  })

  python.stderr.on("data", function (data) {
    console.log("python download error!")
  })
})

export default router
