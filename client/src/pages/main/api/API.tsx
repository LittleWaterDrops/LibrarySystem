import axios from "axios"
import SERVER_CONFIG from "../../../config"
import { ReceiptModel } from "./../../../pages/main/models/ReceiptModel"

export type updateCardDataProps = {
  submitData: ReceiptModel
  dataNumber: number
}
// 멤버 리스트 관련
export async function getMemberList() {
  return (await axios.get(`${SERVER_CONFIG.URL}/home/getMemberList`)).data
}

// 구분 관련
export async function getUsageList() {
  return (await axios.get(`${SERVER_CONFIG.URL}/home/getUsageList`)).data
}

// 전체 데이터 관련
export async function insertCardUseData(resultData: ReceiptModel) {
  return await axios.post(`${SERVER_CONFIG.URL}/home/insertCardUseData`, resultData)
}

export async function getCardUseData() {
  return (await axios.get(`${SERVER_CONFIG.URL}/management/getCardUseData`)).data
}

export async function getCardUseDataByNumber(params: string | undefined) {
  return (await axios.get(`${SERVER_CONFIG.URL}/management/getCardUseData/${params}`)).data
}

export async function updateCardUseDataWithNumber(resultData: updateCardDataProps) {
  return await axios.post(`${SERVER_CONFIG.URL}/management/updateCardUseDataWithNumber`, {
    resultData,
  })
}

export async function deleteCardUseDataWithNumber(deleteNumber: number) {
  return await axios.post(`${SERVER_CONFIG.URL}/management/deleteCardUseDataWithNumber`, {
    deleteNumber: deleteNumber,
  })
}

export async function getSumPaidAmount(currentUsage: string | undefined) {
  return (await axios.get(`${SERVER_CONFIG.URL}/management/getSumPaidAmount/${currentUsage}`))
    .data[0]
}

export async function downloadXSLX() {
  return await axios.get(`${SERVER_CONFIG.URL}/management/downloadXSLX`, {
    responseType: "blob",
  })
}
