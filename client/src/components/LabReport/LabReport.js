import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import { withI18n, Trans } from '@lingui/react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Button, Row, Spin } from 'antd'
import { printBase64 } from 'utils/helper'

const options = {
  cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
}

const LabReport = props => {
  const [laboratoryReport, setLaboratoryReport] = useState()
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  useEffect(() => {
    props
      .dispatch({
        type: 'app/queryLaboratoryReport',
        payload: {
          diagnosticReportId: props.diagnosticReport.id,
          language: 'mn',
        },
      })
      .then(data => {
        const { base64data } = data

        setLaboratoryReport(`data:application/pdf;base64,${base64data}`)
        setPageNumber(1)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePrint = event => {
    event.preventDefault()
    if (!laboratoryReport) {
      return
    }

    printBase64(laboratoryReport)
  }

  return (
    <div>
      <Row
        type="flex"
        justify="center"
        style={{ borderBottom: '1px solid black', margin: '16px' }}
      >
        {/* <div
          style={{
            height: '32px',
            padding: '11px 8px',
          }}
        >
          {pageNumber} / {numPages}
        </div>
        <Button onClick={() => setPageNumber(pageNumber - 1)}>
          <Trans id="Previous" />
        </Button>
        <Button onClick={() => setPageNumber(pageNumber + 1)}>
          <Trans id="Next" />
        </Button> */}

        <Button onClick={handlePrint}>
          <Trans id="Print" />
        </Button>
      </Row>

      {props.loading.effects['app/queryLaboratoryReport'] && <Spin />}
      {laboratoryReport && (
        <Document
          file={laboratoryReport}
          onLoadSuccess={onDocumentLoadSuccess}
          // loading={<Spin />}
          options={options}
        >
          {Array.from(new Array(numPages), (_, index) => {
            return (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                // width="100%"
                // width={800}
                width={props.pageSize}
              />
            )
          })}
          {/* <Page scale={1.0} pageNumber={pageNumber} width={800} /> */}
        </Document>
      )}
    </div>
  )
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(LabReport))
