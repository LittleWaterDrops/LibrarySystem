import axios from "axios"
import SERVER_CONFIG from "../../../config"
import { BookModel } from "../models/BookModel"

export type updateBookDataProps = {
  submitData: BookModel
  dataNumber: number
}

// 전체 데이터 관련
export async function getBookListData() {
  return (await axios.get(`${SERVER_CONFIG.URL}/management/getBookListData`)).data
}

export async function getBookListDataByNumber(params: string | undefined) {
  return (await axios.get(`${SERVER_CONFIG.URL}/management/getBookListData/${params}`)).data
}

export async function insertBookData(resultData: BookModel) {
  return await axios.post(`${SERVER_CONFIG.URL}/home/insertBookData`, resultData)
}

export async function updateBookDataWithNumber(resultData: updateBookDataProps) {
  return await axios.post(`${SERVER_CONFIG.URL}/management/updateBookDataWithNumber`, {
    resultData,
  })
}

export async function deleteBookDataWithNumber(deleteNumber: number) {
  return await axios.post(`${SERVER_CONFIG.URL}/management/deleteBookDataWithNumber`, {
    deleteNumber: deleteNumber,
  })
}

export async function getSumBookAmount() {
  return (await axios.get(`${SERVER_CONFIG.URL}/management/getSumBookAmount`)).data[0]
}

export async function checkBorrowState(serialNumber: string) {
  return (
    await axios.post(`${SERVER_CONFIG.URL}/management/checkBorrowState`, {
      serialNumber: serialNumber,
    })
  ).data
}

export async function borrowBook(canBorrow: boolean, whoBorrow: string, serialNumber: string) {
  return await axios.post(`${SERVER_CONFIG.URL}/management/borrowBook`, {
    canBorrow: canBorrow,
    whoBorrow: whoBorrow,
    serialNumber: serialNumber,
  })
}

export async function getFilteredBookListData(submitData: any) {
  return (await axios.post(`${SERVER_CONFIG.URL}/management/getFilteredBookListData`, submitData))
    .data
}
