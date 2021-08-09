import React, { useEffect, useState } from 'react'
import PropTypes, { element } from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'
import { codeIntersects } from 'utils/controller'
const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>
    <Trans id={'Хепатитын вирүсийн маркер илрүүлэх шинжилгээ'} />
  </div>
)

const Title1 = (
  <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>
    <Trans id={'ХДХВ-ийн эсрэгбие илрүүлэх  шинжилгээ'} />
  </div>
)
const Title2 = (
  <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>
    <Trans id={'Тэмбүүгийн илрүүлэх  шинжилгээ'} />
  </div>
)

const A4paper = props => (
  <div
    style={{
      width: '210mm',
      minHeight: '297mm',
      // padding: '2cm',
      // margin: '1cm auto',
    }}
    {...props}
  >
    {props.children}
  </div>
)

const remark = {
  HBsAg_Negative: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд хепатитын В вирүсийн гадаргуугийн эсрэгтөрөгч (HBsAg) илрээгүй
          тул дархлаа тогтсон (anti-HBs) эсэхийг шалгана уу. Хэрэв дархлаа
          тогтоогүй тохиолдолд В вирүсийн эсрэг вакцин хийлгэх нь зүйтэй.
          Ингэснээр та ХВВ болон ХДВ-ийн халдвараас 10-15 жил хамгаалагдана.
        </span>
      </strong>
    </div>
  ),
  HBsAg_Positive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд хепатитын В вирүсийн гадаргуугийн эсрэгтөрөгч (HBsAg) илэрсэн тул
          мэргэжлийн эмчид хандан зөвлөгөө авах, шаардлагатай бол онош
          баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь
          зүйтэй.
        </span>
      </strong>
    </div>
  ),
  HBsAg_WeaklyPositive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд хепатитын В вирүсийн гадаргуугийн эсрэгтөрөгч (HBsAg) илэрсэн
          байх магадлалтай тул дараагийн шатны баталгаажуулах шинжилгээ хийлгэж,
          нарийн мэргэжлийн эмчид хандах нь зүйтэй.
        </span>
      </strong>
    </div>
  ),
  antiHCV_Positive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд Хепатитын С вирүсийн эсрэг бие (anti-HCV) илрэх нь архаг С
          хепатит, С хепатитаар өвдөөд аяндаа эдгэрсэн эсвэл хуурамч эерэг (C
          хепатитгүй ч шинжилгээний хариу эерэг байх) зэрэг тохиолдлууд байж
          болно.Та эмчээс зөвлөгөө авч, шаардлагатай бол онош баталгаажуулах
          зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь зүйтэй.
        </span>
      </strong>
    </div>
  ),
  antiHCV_Negative: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд Хепатитын С вирүсийн эсрэгбие (anti-HCV) илрээгүй байна.Та
          халдвар авахаас сэрэмжлээрэй.
        </span>
      </strong>
    </div>
  ),
  antiHCV_WeaklyPositive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд хепатитын С вирүсийн эсрэгбие (anti-HCV) илэрсэн байх магадлалтй
          тул дараагийн шатны баталгаажуулах шинжилгээ хийлгэж, нарийн
          мэргэжлийн эмчид хандах нь зүйтэй.
        </span>
      </strong>
    </div>
  ),
  HIV_Positive: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд Хүний Дархлал Хомсдлын вирүс (ХДХВ)-ийн эсрэгбие (anti-HIV)
          илэрсэн тул нарийн мэргэжлийн эмчид хандан зөвлөгөө авах нь зүйтэй.
        </span>
      </strong>
    </div>
  ),
  HIV_Negative: (
    <div style={{ marginTop: '5px' }}>
      <strong>
        <span>
          Танд Хүний Дархлал Хомсдлын вирүс (ХДХВ)-ийн эсрэгбие (anti-HIV)
          илрээгүй байна. Та халдвар авахаас сэргийлээрэй.
        </span>
      </strong>
    </div>
  ),
}

const RapidTests = props => {
  const { Practitioner } = props.app
  const patientBarcode = props.patient && props.patient._getBarcode()

  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [hivDataSource, setHivDataSource] = useState([])
  const [SyphillsDataSource, setSyphillsDataSource] = useState([])

  const [remarkArray, setRemarkArray] = useState([])
  const [hivRemarkArray, setHivRemarkArray] = useState([])

  const [rawData, setRawData] = useState()

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
      render: (text, record) => {
        console.log(text)
        const { result, resultKey } = text
        // result => shinjilgeenii hariu
        if (resultKey === 'positive') {
          return (
            <div>
              (+) <Trans id={result} />{' '}
            </div>
          )
        } else if (resultKey === 'negative') {
          return (
            <div>
              (-) <Trans id={result} />
            </div>
          )
        } else if (resultKey === 'weaklyPositive') {
          return (
            <div>
              (+) <Trans id={result} />
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
        const HivTableData = []
        const SyphillsTableData = []

        setRawData(data)

        Object.keys(data.include).forEach((testKey, testIndex) => {
          const { valueCodeableConcept, status } = data.include[
            testKey
          ].latestObservation

          if (status !== 'final') {
            throw new Error('Observation must be of final status')
          }
          const testResultKey = Object.keys(
            props.app.FHIR_CODES.QualitativeTestResults
          ).find(key => {
            const testResult = props.app.FHIR_CODES.QualitativeTestResults[key]
            return codeIntersects(testResult.code, valueCodeableConcept)
          })
          const valueCodeableConceptObject =
            props.app.FHIR_CODES.QualitativeTestResults[testResultKey]
          const result = valueCodeableConceptObject.display

          const dataItem = {
            key: testIndex,
            testName:
              props.app.FHIR_CODES.UncategorizedTests.RapidTests.include[
                testKey
              ].display,
            finalResult: result,
            result: {
              result: result,
              resultKey: testResultKey,
            },
          }
          console.log(testKey)
          if (testKey === 'HIV') {
            HivTableData.push(dataItem)
          } else if (testKey === 'Syphills') {
            SyphillsTableData.push(dataItem)
          } else {
            tableData.push(dataItem)
          }
        })

        const updatedRemarkArray = tableData
          .map(element => {
            if (element.testName === 'HBsAg') {
              if (element.finalResult === 'Negative') {
                return remark.HBsAg_Negative
              } else if (element.finalResult === 'Positive') {
                return remark.HBsAg_Positive
              } else if (element.finalResult === 'Weakly positive') {
                return remark.HBsAg_WeaklyPositive
              }
            }

            if (element.testName === 'anti-HCV') {
              if (element.finalResult === 'Negative') {
                return remark.antiHCV_Negative
              } else if (element.finalResult === 'Positive') {
                return remark.antiHCV_Positive
              } else if (element.finalResult === 'Weakly positive')
                return remark.antiHCV_WeaklyPositive
            }
          })
          .filter(value => !!value)

        const updatedHivRemarkArray = HivTableData.map(element => {
          if (element.testName === 'HIV') {
            if (element.finalResult === 'Negative') {
              return remark.HIV_Negative
            } else if (element.finalResult === 'Positive') {
              return remark.HIV_Positive
            }
          }
        }).filter(value => !!value)

        setDataSource(tableData)
        setHivDataSource(HivTableData)
        setSyphillsDataSource(SyphillsTableData)

        // Санамж
        setRemarkArray(updatedRemarkArray)
        setHivRemarkArray(updatedHivRemarkArray)
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(dataSource)
  console.log(hivDataSource)
  console.log(SyphillsDataSource)

  return (
    <div>
      {loadingData && (
        <Row type="flex" justify="center">
          <Spin spinning={loadingData} />
        </Row>
      )}

      {!loadingData && (
        <div className={styles.container}>
          {hivDataSource.length > 0 && (
            <div>
              <BlankHeader
                title={Title1}
                instrumentSerialNumber="275020346"
                protocol="М-ЭТ-010"
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
                    dataSource={hivDataSource}
                    // className={styles.table}
                    pagination={false}
                    columns={columns}
                    bordered
                  ></Table>
                </div>
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
                        &nbsp; <Trans id={'Immunochromatographic assay'} />
                        <br />
                        &nbsp;{' '}
                        <Trans id={'CTK, OnSite-Lateral flow rapid test'} />
                        <br />
                        &nbsp;-
                      </Text>
                    </Col>
                  </Row>
                </div>
              </div>
              {hivRemarkArray.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <div className="bold">Санамж:</div>
                  <ul>
                    {hivRemarkArray.map(remark => {
                      return <li>{remark}</li>
                    })}
                  </ul>
                </div>
              )}
              <BlankFooterLabTest
                style={{ marginTop: '32px', marginBottom: '250px' }}
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
          {SyphillsDataSource.length > 0 && (
            <div>
              <BlankHeader
                title={Title2}
                instrumentSerialNumber="275020346"
                protocol="М-ЭТ-010"
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
                    dataSource={SyphillsDataSource}
                    // className={styles.table}
                    pagination={false}
                    columns={columns}
                    bordered
                  ></Table>
                </div>
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
                        &nbsp; <Trans id={'Immunochromatographic assay'} />
                        <br />
                        &nbsp;{' '}
                        <Trans id={'CTK, OnSite-Lateral flow rapid test'} />
                        <br />
                        &nbsp;-
                      </Text>
                    </Col>
                  </Row>
                </div>
              </div>

              <BlankFooterLabTest
                style={{ marginTop: '32px', marginBottom: '250px' }}
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
          {dataSource.length > 0 && (
            <div>
              <BlankHeader
                title={Title}
                instrumentSerialNumber="275020346"
                protocol="М-ЭТ-010"
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
                    // className={styles.table}
                    pagination={false}
                    columns={columns}
                    bordered
                  ></Table>
                </div>
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
                        &nbsp; <Trans id={'Immunochromatographic assay'} />
                        <br />
                        &nbsp;{' '}
                        <Trans id={'CTK, OnSite-Lateral flow rapid test'} />
                        <br />
                        &nbsp;-
                      </Text>
                    </Col>
                  </Row>
                </div>
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
      )}
    </div>
  )
}

RapidTests.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(RapidTests))
