const XLSX = require('xlsx')
const uuidv4 = require('uuid/v4')
const CONFIG = require('../config')
const { fhirServer } = require('../config')
const fs = require('fs')

function excelGenerator(data) {
  const ws = XLSX.utils.aoa_to_sheet(data)

  ws['!cols'] = fitToColumn(data)

  function fitToColumn(arrayData) {
    // get maximum character of each column
    return arrayData[0].map((a, i) => ({
      wch: Math.max(
        ...arrayData.map(a2 =>
          a2[i] === undefined ? '' : a2[i].toString().length
        )
      ),
    }))
  }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

  /* generate buffer */

  const rootDir = CONFIG.EXCEL_OUTPUT_DIR
  const path = `${rootDir}/${uuidv4()}.xlsx`

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir)
  }

  const buf = XLSX.writeFile(wb, path)
  return path
  // console.log(buf)
}

module.exports = excelGenerator
