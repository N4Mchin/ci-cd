import React, { useState, useEffect } from 'react'
import PropTypes, { element } from 'prop-types'
import { Modal, Row, Col, Checkbox, Select, Button, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import uuidv4 from 'uuid/v4'

const { Option } = Select
const DAYS = 12
const StratageneAgilent = 'StratageneAgilent'
const BioradCFX = 'BioradCFX'
const AbbottM2000 = 'AbbottM2000'

const dataArray = [
  {
    rowName: 'A',
  },
  {
    rowName: 'B',
  },
  {
    rowName: 'C',
  },
  {
    rowName: 'D',
  },
  {
    rowName: 'E',
  },
  {
    rowName: 'F',
  },
  {
    rowName: 'G',
  },
  {
    rowName: 'H',
  },
]

const SampleModule = props => {
  const [checkedList, setCheckedList] = useState([])

  useEffect(() => {
    setCheckedList([props.value])
  }, [props.value])

  const onChange = values => {
    if (props.singleValue) {
      const singleValue = values[values.length - 1]
      setCheckedList([singleValue])
      return props.onChange(singleValue)
    } else {
      setCheckedList(values)
      return props.onChange(values)
    }
  }
  return (
    <div>
      <Checkbox.Group
        value={checkedList}
        onChange={onChange}
        disabled={props.disabled}
        style={{ width: '100%' }}
      >
        {dataArray.map(element => {
          const checkboxArray = []
          for (let dayIndex = 1; dayIndex <= DAYS; dayIndex++) {
            checkboxArray.push(
              <Col>
                <Checkbox
                  value={`${element.rowName}${dayIndex}`}
                  key={uuidv4()}
                >
                  {element.rowName}
                  {dayIndex}
                </Checkbox>
              </Col>
            )
          }

          return (
            <div>
              <Row type="flex" justify="space-between">
                {checkboxArray}
              </Row>
            </div>
          )
        })}
      </Checkbox.Group>
    </div>
  )
}

const ModalModule = props => {
  const {
    app,
    location,
    laboratory_test_viralLoadTests,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const [repickChecked, setRepickChecked] = useState(false)
  const [moduleData, setModuleData] = useState()
  const [loadingData, setLoadingData] = useState()
  const [selectedApparatus, setSelectedApparatus] = useState(StratageneAgilent)
  const [selectedModule, setSelectedModule] = useState()
  const [formComplete, setFormComplete] = useState()

  useEffect(() => {
    if (!!selectedApparatus && !!selectedModule) {
      setFormComplete(true)
    } else {
      setFormComplete(false)
    }
  }, [selectedApparatus, selectedModule])

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'laboratory_test_viralLoadTests/readModule',
        payload: {
          serviceRequestId: props.serviceRequestId,
        },
      })
      .then(moduleData => {
        setModuleData(moduleData)

        if (!!moduleData) {
          setSelectedApparatus(moduleData.apparatus)
          setSelectedModule(moduleData.module)
        }
      })
      .then(() => setLoadingData(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onModuleChange = value => {
    setSelectedModule(value)
  }

  const onModuleSave = () => {
    if (!formComplete) {
      return
    }
    let type
    if (props.module) {
      type = 'laboratory_test_viralLoadTests/updateModule'
    } else {
      type = 'laboratory_test_viralLoadTests/saveModule'
    }

    return props
      .dispatch({
        type: type,
        payload: {
          moduleData: {
            serviceRequestId: props.serviceRequestId,
            apparatus: selectedApparatus,
            module: selectedModule,
          },
        },
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
  }

  const onModuleRepick = event => {
    setRepickChecked(event.target.checked)
  }
  const onApparatusChange = value => {
    setSelectedApparatus(value)
    setSelectedModule()
  }

  return (
    <Modal
      {...modalProps}
      closable={false}
      footer={[
        <Button className="button-gray uppercase" onClick={props.onCancel}>
          <Trans id="Cancel" />
        </Button>,
        <Button
          className="button-red uppercase"
          onClick={onModuleSave}
          disabled={!formComplete}
        >
          &nbsp;
          <Trans id="Save" />
        </Button>,
      ]}
      width="50vw"
    >
      <Row type="flex" justify="center">
        <Spin spinning={loadingData} />
      </Row>

      {!loadingData && (
        <div
          style={{
            padding: '18px',
            background: 'white',
            border: '1px solid #C9C9C9',
            marginTop: '12px',
          }}
        >
          <Row type="flex" justify="space-between" align="middle" gutter={16}>
            <Col span={6}>
              <div style={{ width: 'fit-content' }}>Аппарат</div>
            </Col>
            <Col span={16}>
              <Select
                style={{ width: '100%', fontSize: '10px' }}
                value={selectedApparatus}
                onChange={onApparatusChange}
              >
                <Option value={StratageneAgilent}>
                  Stratagene Agilent Technologies Mx3005p
                </Option>
                <Option value={BioradCFX}>Biorad CFX-96 Dx </Option>
                <Option value={AbbottM2000}>Abbott M2000</Option>
              </Select>
            </Col>
          </Row>
          <div
            style={{
              width: '100%',
              border: '1px solid #C9C9C9',
              display: 'inline-block',
              margin: '8px 0',
            }}
          ></div>
          {moduleData && (
            <>
              <Checkbox onChange={onModuleRepick}>
                <b>Модуль</b> дахин сонгох
              </Checkbox>
              <div
                style={{
                  width: '100%',
                  border: '1px solid #C9C9C9',
                  display: 'inline-block',
                  margin: '8px 0',
                }}
              ></div>
            </>
          )}

          <SampleModule
            singleValue={true}
            disabled={!repickChecked && moduleData ? true : false}
            selectedApparatus={selectedApparatus}
            value={selectedModule}
            onChange={onModuleChange}
          />
        </div>
      )}
    </Modal>
  )
}

ModalModule.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  onChange: PropTypes.func,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(ModalModule))
