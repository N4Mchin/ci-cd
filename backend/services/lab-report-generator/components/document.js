const PDFDocument = require('@utils/PDFDocumentWithTables')

const pageWidth = 595.28
const pageHeight = 841.89
const leftMargin = 30
const rightMargin = 30
const topMargin = 30
const bottomMargin = 30
const rightAlign = pageWidth - rightMargin
const leftAlign = leftMargin
const containerWidth = pageWidth - rightMargin - leftMargin

const pageSettings = {
  pageWidth,
  pageHeight,
  leftMargin,
  rightMargin,
  topMargin,
  bottomMargin,
  rightAlign,
  leftAlign,
  containerWidth,
}

module.exports = function doc(writeStream) {
  /* #region  INIT */
  const doc = new PDFDocument({
    size: 'A4',
    permissions: {
      printing: 'highResolution',
    },
    autoFirstPage: false,
    margins: {
      top: topMargin,
      left: leftMargin,
      right: rightMargin,
      bottom: bottomMargin,
    },
  })

  doc.on('pageAdded', () => doc.image('assets/print_background.png', 0, 0))

  // doc.on('pageAdded', () => {
  //   console.log('My size ' + doc.page.size)
  //   console.log('My layout ' + doc.page.layout)
  //   console.log('My margins ' + JSON.stringify(doc.page.margins))
  // })

  doc.addPage()

  doc.pipe(writeStream)
  doc.font('fonts/Helvetica-Neue.woff')
  /* #endregion */
  return {
    doc,
    pageSettings,
  }
}
