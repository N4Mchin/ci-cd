import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row, Icon, Divider } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse, CompactTable } from 'components'
import styles from '../../../../styles.less'
const CheckList = props => {
  const [tabIndex, setTabIndex] = useState('1')
  const [loadingData, setLoadingData] = useState(false)

  // const [dataSource, setDataSource] = useState()

  // useEffect(() => {
  //   setLoadingData(true)

  //   props
  //     .dispatch({
  //       //   type: 'practitioner_patient_profile/queryDlivrInfo',
  //     })
  //     .then(result => {
  //       console.log('resuuuuuuuuuuuuuuuuuuuuuuuuuult', result)
  //       return setDataSource(result)
  //     })
  //     .finally(() => {
  //       setLoadingData(false)
  //     })
  // })

  const columns = [
    {
      title: '',
      dataIndex: 'number',
      key: 'number',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
      render: (text, record) => {
        return <div style={{ textAlign: 'left' }}>{record.description}</div>
      },
    },
    {
      title: <div></div>,
      dataIndex: 'preScreening',
      key: 'preScreening',
      width: '25%',
      render: (text, record, rowIndex) => {
        if (rowIndex === 0) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 1) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 2) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 3) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 4) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 5) {
          return {
            children: <div></div>,
          }
        } else if (rowIndex === 6) {
          return {
            children: <Icon type="check" />,
          }
        } else if (rowIndex === 9) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 10) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 18) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 19) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 20) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 23) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 24) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 28) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 29) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 30) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 31) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        }
      },
    },
    {
      title: <div></div>,
      dataIndex: 'screening',
      key: 'screening',
      width: '25%',
      render: (text, record, rowIndex) => {
        if (rowIndex === 0) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 1) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 2) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 3) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 4) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 5) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 6) {
          return {
            children: <div></div>,
          }
        } else if (rowIndex === 7) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 8) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 9) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 10) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 11) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 12) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 13) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 14) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 15) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 16) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 17) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 19) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 20) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 21) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 22) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 23) {
          return {
            props: {
              colSpan: 0,
            },
          }
        } else if (rowIndex === 24) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 25) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 26) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 27) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 30) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        } else if (rowIndex === 31) {
          return {
            children: <Icon type="check" style={{ fontSize: '15px' }} />,
          }
        }
      },
    },
  ]

  const dataSource = [
    {
      key: '3',
      number: '1',
      description: <Trans id={'informedConsent'} />,
    },
    {
      key: '4',
      number: '2',
      description: <Trans id={'inclusionExclusionCriteria'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: '',
    },
    {
      key: '5',
      number: '3',
      description: <Trans id={'Demographics'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: '',
    },
    {
      key: '6',
      number: '4',
      description: <Trans id={'MedicalHistory'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '7',
      number: '5',
      description: <Trans id={'PriorAndConcomitantMedicationCollection'} />,

      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '8',
      number: '6',
      description: <Trans id={'ComprehensivePhysicalExam'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '9',
      number: '7',
      description: <Trans id={'AbbreviatedPhysicalExam'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: <div></div>,
    },
    {
      key: '10',
      number: '8',
      description: <Trans id={'ChronicLiverDiseaseQuestionnare'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '11',
      number: '9',
      description: <Trans id={'OphthalmologicalExam'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '12',
      number: '10',
      description: <Trans id={'AdverseEvents'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '13',
      number: '11',
      description: <Trans id={'VitalSign'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '14',
      number: '12',
      description: <Trans id={'ElectroCardiogram'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '15',
      number: '13',
      description: <Trans id={'LiverBiopsy'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '16',
      number: '14',
      description: <Trans id={'FibroScanORFibroTest'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '17',
      number: '15',
      description: (
        <Trans id={'ClinicalLaboratoryTests(hematologyChemistryUrinalysis)'} />
      ),
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '18',
      number: '16',
      description: (
        <Trans id={'SupplementalClinicalChemistryTest(forSemenAnalysis)'} />
      ),
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '19',
      number: '17',
      description: <Trans id={'PregnancyTest(serum)'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '20',
      number: '18',
      description: <Trans id={'SemenAnalysis'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '21',
      number: '19',
      description: <Trans id={'HBV_Genotyping'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: <div></div>,
    },
    {
      key: '22',
      number: '20',
      description: <Trans id={'HBV_DNAViralLoad'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '23',
      number: '21',
      description: <Trans id={'HBV_Serology'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '24',
      number: '22',
      description: <Trans id={'HCV_RNA_ViralLoad'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '25',
      number: '23',
      description: <Trans id={'HCV_Serology'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '26',
      number: '24',
      description: <Trans id={'HDV_Genotyping'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: <div></div>,
    },
    {
      key: '27',
      number: '25',
      description: <Trans id={'HDV_RNA_ViralLoad'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    ///////////////////////////////////////////////////////////////
    {
      key: '28',
      number: '26',
      description: <Trans id={'HDV_Serology'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },

    {
      key: '29',
      number: '27',
      description: <Trans id={'HIV_RNA_ViralLoad'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '30',
      number: '28',
      description: <Trans id={'HIV_Serology'} />,
      preScreening: <div></div>,
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '31',
      number: '29',
      description: <Trans id={'UrineDrugScreen'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: <div></div>,
    },
    {
      key: '32',
      number: '30',
      description: <Trans id={'BloodAlcoholTest'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: <div></div>,
    },
    {
      key: '33',
      number: '31',
      description: <Trans id={'Anti_HBV_Nucleos'} />,
      preScreening: (
        <div>
          <Icon type="check" />
        </div>
      ),
      screening: (
        <div>
          <Icon type="check" />
        </div>
      ),
    },
    {
      key: '34',
      number: '32',
      description: <Trans id={'IWRS_Entry'} />,
    },
  ]

  const title = (
    <Trans>
      <span className="uppercase title">CheckList</span>
    </Trans>
  )

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <br />
        <Row>
          <Col span={12}></Col>
          <Col span={12}>
            <Col span={24}>
              <div className={styles.screeningCard}>
                <Col span={11}>
                  <span className="title bold">PRE-SCREENING</span>
                  <p>
                    {' '}
                    <Trans id={'ForPatientsWithUnsuppressedHBV_DNALevels'} />
                  </p>
                </Col>
                <Col span={1}>
                  <Divider type="vertical" style={{ height: '80px' }} />
                </Col>
                <Col span={12}>
                  <span className="title bold">SCREENING</span>
                  <p>
                    {' '}
                    <Trans id={'ForPatientsWithSuppressedHBV_DNALevels'} />
                  </p>

                  <p style={{ fontSize: '12px' }}>
                    <Trans id={'within45DaysOfDay1'} />
                  </p>
                </Col>
              </div>
            </Col>
          </Col>
        </Row>
        <br />
        <div className={styles.checkListTable}>
          <CompactTable
            showHeader={false}
            dataSource={dataSource}
            pagination={false}
            columns={columns}
          />
        </div>
      </BorderCollapse>
    </div>
  )
}

CheckList.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(CheckList))
