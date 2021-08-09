import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Checkbox, Select, Button, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'

const { Option } = Select

const CepheidGeneXpert16 = 'CepheidGeneXpert16'
const CepheidGeneXpert4 = 'CepheidGeneXpert4'

const SampleModule = props => {
  const { selectedApparatus } = props
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
    <Checkbox.Group
      value={checkedList}
      onChange={onChange}
      disabled={props.disabled}
      style={{ width: '100%' }}
    >
      {selectedApparatus === CepheidGeneXpert16 && (
        <>
          <Row type="flex" justify="space-between">
            <Col>
              <Checkbox value="A1">A1</Checkbox>
            </Col>
            <Col>
              <Checkbox value="A2">A2</Checkbox>
            </Col>
            <Col>
              <Checkbox value="A3">A3</Checkbox>
            </Col>
            <Col>
              <Checkbox value="A4">A4</Checkbox>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" style={{ marginTop: '5px' }}>
            <Col>
              <Checkbox value="B1">B1</Checkbox>
            </Col>
            <Col>
              <Checkbox value="B2">B2</Checkbox>
            </Col>
            <Col>
              <Checkbox value="B3">B3</Checkbox>
            </Col>
            <Col>
              <Checkbox value="B4">B4</Checkbox>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" style={{ marginTop: '5px' }}>
            <Col>
              <Checkbox value="C1">C1</Checkbox>
            </Col>
            <Col>
              <Checkbox value="C2">C2</Checkbox>
            </Col>
            <Col>
              <Checkbox value="C3">C3</Checkbox>
            </Col>

            <Col>
              <Checkbox value="C4">C4</Checkbox>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" style={{ marginTop: '5px' }}>
            <Col>
              <Checkbox value="D1">D1</Checkbox>
            </Col>
            <Col>
              <Checkbox value="D2">D2</Checkbox>
            </Col>
            <Col>
              <Checkbox value="D3">D3</Checkbox>
            </Col>
            <Col>
              <Checkbox value="D4">D4</Checkbox>
            </Col>
          </Row>
        </>
      )}
      {selectedApparatus === CepheidGeneXpert4 && (
        <Row type="flex" justify="space-between">
          <Col>
            <Checkbox value="A1">A1</Checkbox>
          </Col>
          <Col>
            <Checkbox value="A2">A2</Checkbox>
          </Col>
          <Col>
            <Checkbox value="A3">A3</Checkbox>
          </Col>
          <Col>
            <Checkbox value="A4">A4</Checkbox>
          </Col>
        </Row>
      )}
    </Checkbox.Group>
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
  const [selectedApparatus, setSelectedApparatus] = useState(CepheidGeneXpert16)
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
                <Option value={CepheidGeneXpert16}>Cepheid GeneXpert 16</Option>
                <Option value={CepheidGeneXpert4}>Cepheid GeneXpert 4</Option>
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
