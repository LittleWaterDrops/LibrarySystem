const CURRENT_YEAR = new Date().getFullYear()
const CURRENT_MONTH = new Date().getMonth() + 1

const DBTables = {
  BOOK_LIST: "bookList",
  // USAGE_LIST: "card_usage_statement",
  // USE_DATA: `DGcard_use_data_${CURRENT_YEAR.toString().slice(2)}${(
  //   "00" + CURRENT_MONTH.toString()
  // ).slice(-2)}`,
}

export default DBTables
