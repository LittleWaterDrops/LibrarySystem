import axios from "axios"
import SERVER_CONFIG from "../../../config"
import { BookModel } from "../models/BookModel"

export type updateCardDataProps = {
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

export async function updateBookDataWithNumber(resultData: updateCardDataProps) {
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
