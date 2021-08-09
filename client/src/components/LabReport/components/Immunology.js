import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'

const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
    <Trans id={'Immunology'} />
  </div>
)
const remark = {
  AFP: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          Альфа-фетопротейн (AFP) нь жирэмсэний үе, элэг өөхлөх, элэгний
          хатуурал, архаг хепатит, элэг болон бусад эрхтэний хавдар зэрэг
          эмгэгүүдийн үед ихсэж болох тул та мэргэжлийн эмчид хандан зөвлөгөө
          авна уу.
        </span>
      </strong>
    </div>
  ),
  Anti_HbsImmunized: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span> Танд хепатитын В вирүсийн эсрэг дархлаа тогтсон байна.</span>
      </strong>
    </div>
  ),
  Anti_HbsNonImmunized: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          Танд хепатитын В вирүсийн эсрэг дархлаа тогтоогүй байна. Та хепатитын
          В вирүсийн эсрэг вакцинд хамрагдах нь зүйтэй.
        </span>
      </strong>
    </div>
  ),
  HBeAg: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          HBeAg нь вирүсийн идэвхийг илэрхийлэх тул мэргэжлийн эмчид хандан
          зөвлөгөө авна уу.
        </span>
      </strong>
    </div>
  ),
  HBsAg_Positive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          HBsAg нь вирүс тээгч болон цочмог, архаг хепатитын үед цусанд илэрнэ.
          Та мэргэжлийн эмчид хандаж зөвлөгөө авах, шаардлагатай бол онош
          баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь
          зүйтэй.
        </span>
      </strong>
    </div>
  ),
  Anti_HCVPositive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          anti-HCV илрэх нь архаг C хепатит, C хепатитаар өвдөөд эдгэрсэн зэрэг
          тохиолдолууд байж болно. Та нарийн мэргэжлийн эмчид хандан зөвлөгөө
          авна уу.
        </span>
      </strong>
    </div>
  ),
  Anti_HCVNegative: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          anti-HCV сөрөг гарах нь халдвар аваагүйг илэрхийлнэ. Та халдвар
          авахаас сэрэмжлээрэй. Хэрэв та С вирүсийн халдвар авсан хэмээн
          сэжиглэж буй тохиолдолд 3 сарын дараа давтан шинжилгээ өгч нарийн
          мэргэжлийн эмчид хандан зөвлөгөө авна уу.
        </span>
      </strong>
    </div>
  ),
  Pivka_II: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          PIVKA II нь элэгний эст өмөн, цөсний эмгэг болон сүрьеэгийн эсрэг
          бэлдмэл удаан хугацаанд хэрэглэсэн үед ихсэж болох тул мэргэжлийн
          эмчид хандана уу.
        </span>
      </strong>
    </div>
  ),
  HBsAg_quantificationPositive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          qHBsAg нь вирүс тээгч болон цочмог, архаг хепатитын үед цусанд илэрнэ.
          Та мэргэжлийн эмчид хандаж зөвлөгөө авах, шаардлагатай бол онош
          баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь
          зүйтэй.
        </span>
      </strong>
    </div>
  ),
  HBsAg_quantificationNegative: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          {' '}
          qHBsAg илрээгүй тул хепатитын В вирүсийн эсрэг дархлаатай (anti-HBs)
          эсэхийг шалгуулна уу. Хэрэв дархлаа тогтоогүй тохиолдолд хепатитын В
          вирүсийн эсрэг вакцин хийлгэх нь зүйтэй.
        </span>
      </strong>
    </div>
  ),
}
const Immunology = props => {
  const { Practitioner } = props.app
  const patientBarcode = props.patient && props.patient._getBarcode()
  const [loadingData, setLoadingData] = useState(false)
  const [rawData, setRawData] = useState()
  const [dataSource, setDataSource] = useState([])
  const [remarkArray, setRemarkArray] = useState([])

  const [runCompletionTime, setRunCompletionTime] = useState()
  const [sampleCollectedDate, setSampleCollectedDate] = useState()
  const [verifiedTime, setVerifiedTime] = useState()
  const [collector, setCollector] = useState()
  const [performer, setPerformer] = useState()
  const [verifiedPractitioner, setVerifiedPractitioner] = useState()
  const columns = [
    {
      title: <Trans id={'Parameter'} />,
      dataIndex: 'testName',
      key: 'testName',
      width: '20%',
    },

    {
      title: <Trans id={'Result'} />,
      dataIndex: 'result',
      key: 'result',
      width: '20%',
      render: (result, record) => {
        if (
          record.testItem === 'HBeAg' ||
          record.testItem === 'HBsAg_quantification' ||
          record.testItem === 'Anti_HCV'
        ) {
          if (
            !isNaN(parseFloat(record.referenceRangeHigh)) &&
            result >= record.referenceRangeHigh
          ) {
            return (
              <div>
                {' '}
                {result} (<Trans id="Positive" />)
              </div>
            )
          } else if (
            !isNaN(parseFloat(record.referenceRangeLow)) &&
            result >= record.referenceRangeLow &&
            !isNaN(parseFloat(record.referenceRangeHigh)) &&
            result < record.referenceRangeHigh
          ) {
            return (
              <div>
                {result} (<Trans id="Negative" />)
              </div>
            )
          } else if (
            !isNaN(parseFloat(record.referenceRangeLow)) &&
            result < record.referenceRangeLow
          ) {
            return <div>{result}</div>
          }
        } else {
          if (
            !isNaN(parseFloat(record.referenceRangeHigh)) &&
            result >= record.referenceRangeHigh
          ) {
            return <div>{result}</div>
          } else if (
            !isNaN(parseFloat(record.referenceRangeLow)) &&
            result >= record.referenceRangeLow &&
            !isNaN(parseFloat(record.referenceRangeHigh)) &&
            result < record.referenceRangeHigh
          ) {
            return <div>{result}</div>
          } else if (
            !isNaN(parseFloat(record.referenceRangeLow)) &&
            result < record.referenceRangeLow
          ) {
            return <div>{result}</div>
          }
        }
      },
    },
    {
      title: <Trans id={'Unit'} />,
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
    },
    {
      title: <Trans id={'Reference range'} />,
      dataIndex: 'regular',
      key: 'regular',
      width: '20%',
      render: (text, record) => {
        if (record.testItem === 'AFP') {
          return (
            <div>
              {record.referenceRangeLow}-{record.referenceRangeHigh}
            </div>
          )
        } else if (record.testItem === 'Anti_Hbe') {
          return (
            <div>
              {' < '}
              <span>
                {record.referenceRangeHigh} (<Trans id="Negative" />)
              </span>
            </div>
          )
        } else if (record.testItem === 'Anti_Hbs') {
          return (
            <div>
              {' ≥ '}
              <span>
                {record.referenceRangeHigh} (<Trans id="Immunized" />)
              </span>
            </div>
          )
        } else if (record.testItem === 'HBeAg') {
          return (
            <div>
              {/* {' < '} */}
              <span>
                {record.referenceRangeLow}-{record.referenceRangeHigh} (
                <Trans id="Negative" />)
              </span>
            </div>
          )
        } else if (record.testItem === 'Anti_HCV') {
          return (
            <div>
              {/* {' < '} */}
              <span>
                {record.referenceRangeLow}-{record.referenceRangeHigh} (
                <Trans id="Negative" />)
              </span>
            </div>
          )
        } else if (record.testItem === 'HBsAg_quantification') {
          return (
            <div>
              <span>
                {record.referenceRangeLow}-{record.referenceRangeHigh}
                <Trans id="Negative" />
              </span>
            </div>
          )
        } else {
          return (
            <div>
              {record.referenceRangeLow}-{record.referenceRangeHigh}
            </div>
          )
        }
      },
    },
  ]

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'app/queryLabResult',
        payload: {
          testKey: props.testKey,
          testCode: props.testCode,
          serviceRequestId: props.serviceRequest.id,
        },
      })
      .then(data => {
        console.log(data)
        const collector = data.specimen[0].collection.collector.display
        const { performedPractitioner, verifiedPractitioner } = data

        setPerformer(
          performedPractitioner &&
            performedPractitioner.getOfficialNameString({
              short: true,
            })
        )

        setVerifiedPractitioner(
          verifiedPractitioner &&
            verifiedPractitioner.getOfficialNameString({
              short: true,
            })
        )

        setRunCompletionTime(data.runCompletionTime)
        setSampleCollectedDate(data.sampleCollectedDate)
        setVerifiedTime(data.verifiedTime)
        setCollector(collector)

        const tableData = []
        setRawData(data)

        Object.keys(data.include).forEach(testKey => {
          Object.keys(data.include[testKey].include).forEach(
            (subTestKey, index) => {
              const { valueQuantity, status } = data.include[testKey].include[
                subTestKey
              ].latestObservation

              if (status !== 'final') {
                throw new Error('Observation must be of final status')
              }

              const result = valueQuantity.value
              const unit = valueQuantity.unit
              const { referenceRange } = data.include[testKey].include[
                subTestKey
              ].latestObservation

              const lowValue =
                referenceRange &&
                referenceRange[0] &&
                referenceRange[0].low &&
                referenceRange[0].low.value
              const highValue =
                referenceRange &&
                referenceRange[0] &&
                referenceRange[0].high &&
                referenceRange[0].high.value

              tableData.push({
                key:
                  data.include[testKey].include[subTestKey].latestObservation
                    .id,
                testItem: subTestKey,
                testName:
                  props.app.FHIR_CODES.ImmunologyTests.include[testKey].include[
                    subTestKey
                  ].display,
                interpretation: '',
                result: result,
                unit: unit,
                referenceRangeHigh: highValue,
                referenceRangeLow: lowValue,
              })
            }
          )
        })
        const updatedRemarkArray = tableData
          .map(element => {
            if (element.testItem === 'AFP') {
              if (element.result >= element.referenceRangeHigh) {
                return remark.AFP
              }
            }
            if (element.testItem === 'Anti_Hbs') {
              if (element.result >= element.referenceRangeHigh) {
                return remark.Anti_HbsImmunized
              } else if (element.result < element.referenceRangeHigh) {
                return remark.Anti_HbsNonImmunized
              }
            }
            if (element.testItem === 'HBeAg') {
              if (element.result >= element.referenceRangeHigh) {
                return remark.HBeAg
              }
            }
            if (element.testItem === 'HBsAg_quantification') {
              if (element.result < element.referenceRangeHigh) {
                return remark.HBsAg_quantificationNegative
              } else if (element.result > element.referenceRangeHigh) {
                return remark.HBsAg_quantificationPositive
              }
            }
            if (element.testItem === 'Anti_HCV') {
              if (element.result < element.referenceRangeHigh) {
                return remark.Anti_HCVNegative
              } else if (element.result >= element.referenceRangeHigh) {
                return remark.Anti_HCVPositive
              }
            }
            if (element.testItem === 'HBsAg_quantification') {
              if (element.result < element.referenceRangeHigh) {
                return remark.HBsAg_quantificationNegative
              } else if (element.result >= element.referenceRangeHigh) {
                return remark.HBsAg_quantificationPositive
              }
            }
            if (element.testItem === 'Pivka_II') {
              if (element.result < element.referenceRangeHigh) {
                //
              } else if (element.result >= element.referenceRangeHigh) {
                return remark.Pivka_II
              }
            }
          })
          .filter(value => !!value)

        console.log(tableData)
        setDataSource(tableData)
        setRemarkArray(updatedRemarkArray)
      })
      .then(() => {
        setLoadingData(false)
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {loadingData && (
        <Row type="flex" justify="center">
          <Spin spinning={loadingData} />
        </Row>
      )}

      {!loadingData && (
        <div className={styles.container}>
          <BlankHeader
            title={Title}
            instrumentSerialNumber="275020346"
            protocol="М-ЭТ-006"
            practitioner={Practitioner}
            patientBarcode={patientBarcode}
            patient={props.patient}
          />
          <div className={styles.content}>
            <Divider className={styles.divider} />
            <Row
              style={{
                fontSize: '14px',
                fontFamily: 'Helvetica Neue Bold',
                margin: '8px 0',
              }}
            >
              <Trans id={'Test result'} />
            </Row>
            <div className={styles.tableBorder}>
              <Table
                dataSource={dataSource}
                className={styles.table}
                pagination={false}
                columns={columns}
                bordered
              ></Table>
            </div>
          </div>
          {/* 
          <div className={styles.content}>
            <Divider className={styles.divider} /> */}

          <div style={{ marginTop: '40px' }}>
            <Row>
              <Col span={8} style={{ fontSize: '14px' }}>
                <Text>
                  <Trans id={'Sample Type:'} />
                  <br />
                  <Trans id={'Assay Method:'} />
                  <br />
                  <Trans id={'Instrument name:'} />
                </Text>
              </Col>
              <Col span={10} style={{ fontSize: '14px' }}>
                <Text>
                  &nbsp; <Trans id={'Serum'} />
                  <br />
                  &nbsp; <Trans id={'CLIA'} />
                  <br />
                  &nbsp; <Trans id={'SYSMEX HISCL-5000'} />
                  <br />
                  &nbsp;-
                </Text>
              </Col>
            </Row>
          </div>
          {remarkArray.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <div className="bold">Санамж:</div>
              <ul>
                {remarkArray.map(remark => {
                  return <li>{remark}</li>
                })}
              </ul>
            </div>
          )}
          <BlankFooterLabTest
            style={{ marginTop: '32px' }}
            runCompletionTime={runCompletionTime}
            sampleCollectedDate={sampleCollectedDate}
            verifiedTime={verifiedTime}
            collector={collector}
            performer={performer}
            verifiedPractitioner={verifiedPractitioner}
            practitioner={Practitioner}
          />
        </div>
      )}
    </div>
  )
}

Immunology.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(Immunology))
