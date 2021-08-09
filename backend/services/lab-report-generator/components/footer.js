const translate = require('./translate')
const moment = require('moment-timezone')
const CONFIG = require('@config')

const SAMPLE_TYPE = 'Sample type'
const ASSAY_METHOD = 'Assay method'
const INSTRUMENT_NAME = 'Instrument name'
const PHLEBOTOMIST = 'Phlebotomist'
const OPERATOR_ID = 'Operator ID'
const PHYSICIAN = 'Physician'
const ADDRESS =
  'Address: Liver Center, Dalai Tower, UNESCO street 31, Sukhbaatar District, Ulaanbaatar, Mongolia'
const CONTACT_INFO = `Phone: 70132006\nFax: 70132006\nPrinted date:`

module.exports = function drawTestDetails({
  doc,
  language,
  pageSettings,
  sampleType,
  assayMethod,
  instrumentName,
  sampleCollectedPractitioner,
  sampleCollectedDate,
  recordedPractitioner,
  recordedDate,
  assertedPractitioner,
  assertedDate,
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

  const rows1 = [
    [translate(SAMPLE_TYPE, language), sampleType],
    [translate(ASSAY_METHOD, language), assayMethod],
    [translate(INSTRUMENT_NAME, language), instrumentName],
  ]

  const rows2 = [
    [
      `${translate(PHLEBOTOMIST, language)}:`,
      sampleCollectedPractitioner,
      sampleCollectedDate,
    ],
    [
      `${translate(OPERATOR_ID, language)}:`,
      recordedPractitioner,
      recordedDate,
    ],
    [`${translate(PHYSICIAN, language)}:`, assertedPractitioner, assertedDate],
  ]

  const rows3 = [
    [
      `${translate(ADDRESS, language)}`,
      `${translate(CONTACT_INFO, language)} ${moment
        .tz(new Date(), CONFIG.DEFAULT_REGION)
        .format('YYYY.MM.DD')}`,
    ],
  ]

  let currentHeight

  function displayRows({ rows, alignment, column }) {
    currentHeight = doc.y

    rows.forEach(row => {
      let columnWidth = column ? column : containerWidth / row.length
      let startX = leftAlign
      let rowHeight = computeRowHeight({
        row: row,
        columnWidth: columnWidth,
        align: 'left',
      })

      // Switch to next page if we cannot go any further because the space is over.
      // For safety, consider 3 rows margin instead of just one
      if (currentHeight + 3 * rowHeight > pageHeight - bottomMargin) {
        doc.addPage()
        currentHeight = doc.y
      }

      row.map((rowItem, index) => {
        let align
        if (alignment === 'end') {
          align = 'justify'
          if (index === 0) {
            align = 'left'
          } else if (index === row.length - 1) {
            align = 'right'
          }
        } else if (alignment === 'left') {
          align = 'left'
        }

        doc.text(rowItem, startX, currentHeight, {
          width: columnWidth,
          align: align,
        })

        startX = startX + columnWidth
      })

      currentHeight = currentHeight + rowHeight
    })
  }

  function computeRowHeight({ row, columnWidth, align }) {
    let result = 0

    row.forEach(cell => {
      const cellHeight = doc.heightOfString(cell, {
        width: columnWidth,
        align: align,
      })
      result = Math.max(result, cellHeight)
    })

    return result
  }

  doc.fontSize(9)
  displayRows({ rows: rows1, alignment: 'left', column: 180 })
  doc.moveDown(2)

  if (currentHeight + 100 > pageHeight - bottomMargin) {
    doc.addPage()
    currentHeight = doc.y
  }
  doc.image('assets/tamga.png', 200, doc.y - 25, {
    fit: [100, 100],
    align: 'center',
    valign: 'center',
  })
  displayRows({
    rows: rows2,
    alignment: 'end',
    // column: 200
  })
  doc
    .moveDown(1)
    // .strike(
    //   leftMargin,
    //   doc.y,
    //   pageWidth - rightMargin - leftMargin,
    //   doc.currentLineHeight()
    // )
    .rect(leftMargin, doc.y, pageWidth - rightMargin - leftMargin, 0.25)
    .stroke()
    .moveDown(1)

  displayRows({ rows: rows3, alignment: 'end' })
}
