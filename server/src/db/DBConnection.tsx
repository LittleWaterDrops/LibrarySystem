import dotenv from "dotenv"
import path from "path/posix"
import mysql from "mysql"

// DB 환경 구성
dotenv.config({
  path: path.resolve(process.cwd(), "src", "config", ".env"),
})
const currentEnv: NodeJS.ProcessEnv = process.env

// DB 컨트롤
const DBControl = {
  connect: (connection: mysql.Connection) => {
    if (connection.state != "authenticated") {
      connection.connect((error) => {
        if (error) {
          console.log("error when connecting to db:", error)
        }
      })
    }
  },

  end: (connection: mysql.Connection) => {
    if (connection.state != "disconnected") {
      connection.end((error) => {
        if (error) {
          console.log("error when ending to db:", error)
        }
      })
    }
  },

  query: (query: string, callback: any, value?: any) => {
    const createConnection: mysql.Connection = mysql.createConnection({
      host: currentEnv.DB_HOST,
      port: parseInt(currentEnv.DB_PASSWORD || ""),
      user: currentEnv.DB_USER,
      password: currentEnv.DB_PASSWORD,
      database: currentEnv.DB_DATABASE,
      multipleStatements: JSON.parse(currentEnv.DB_MULTIPLE_STATEMENTS || ""),
    })

    // 벨류 값 입력에 따른 판단
    if (value != undefined) {
      createConnection.query(`${query}`, value, function (error, results, field) {
        if (error) {
          console.log("error when query", error)
        }
        callback(results)
        DBControl.end(createConnection)
      })
    } else {
      createConnection.query(`${query}`, function (error, results, field) {
        if (error) {
          console.log("error when query", error)
        }
        callback(results)
        DBControl.end(createConnection)
      })
    }
  },
}

export default DBControl
