module.exports = function drawHeader({
  doc,
  pageSettings,
  title,
  patientBarcode,
  testProtocol,
}) {
  const {
    pageWidth,
    pageHeight,
    leftMargin,
    rightMargin,
    topMargin,
    bottomMargin,
    rightAlign,
    leftAlign,
    containerWidth,
  } = pageSettings

  if (!patientBarcode) {
    throw new Error('patient barcode is missing')
  }

  const topLogoSize = {
    width: 200,
    height: 48,
  }

  const codes = require('rescode')
  codes.loadModules(['ean2', 'ean5', 'ean8', 'ean13'])
  const ean13barcode = codes.create('ean13', patientBarcode)
  const barcodeSize = {
    width: 84,
    height: 32,
  }

  doc
    .image(
      'assets/liver-center-logo.png',
      pageWidth / 2 - topLogoSize.width / 2,
      topMargin,
      {
        fit: [topLogoSize.width, topLogoSize.height],
        align: 'center',
        valign: 'center',
      }
    )
    .rect(
      leftAlign,
      topMargin + topLogoSize.height,
      pageWidth - rightMargin - leftMargin,
      0.5
    )
    .stroke()

  doc
    .font('fonts/Helvetica-Neue.woff')
    .fontSize(10)
    .text(testProtocol, 0, topMargin + topLogoSize.height + 10, {
      width: rightAlign,
      align: 'right',
    })

  doc.image(
    ean13barcode,
    leftAlign,
    topMargin + topLogoSize.height + 10,
    barcodeSize
  )

  const titleWidth = 400
  doc
    .moveDown(2)
    .fontSize(18)
    .font('./fonts/Helvetica-Neue-Medium.woff')
    .text(title, pageWidth / 2 - titleWidth / 2, doc.y, {
      width: titleWidth,
      align: 'center',
    })
    .moveDown(1)
}
