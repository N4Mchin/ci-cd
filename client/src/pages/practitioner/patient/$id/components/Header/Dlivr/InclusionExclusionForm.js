import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import {
  Form,
  Row,
  Col,
  Button,
  Divider,
  DatePicker,
  Radio,
  Upload,
  Input,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { ConfirmModal } from 'components'
import styles from '../../../styles.less'
// import * as helper from 'utils/helper'

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })

const InclusionExclusionForm = props => {
  const { getFieldDecorator } = props.form
  const [
    hetMedregTeswerguiOguulemtei,
    setHetMedregTeswerguiOguulemjtei,
  ] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [hasToxicHabit, setHasToxicHabit] = useState(false)
  const [contraceptionTypeVisible, showContraceptionType] = useState(false)
  const [aliNegOguulemjVisible, showAliNegOguulemj] = useState(false)

  const handleSubmit = () => {
    setSubmitLoading(true)

    return props.form
      .validateFields(async (err, values) => {
        if (err) {
          throw err
        }
        const base64abdominoscopyResults = await Promise.all(
          values.uploadedAbdominoscopyResult.map(file =>
            toBase64(file.originFileObj)
          )
        )

        const base64widenedStomach_Esophagus_Veins = await Promise.all(
          values.widenedStomach_Esophagus_Veins.map(file =>
            toBase64(file.originFileObj)
          )
        )

        const base64additionalInfoUpload =
          values.additionalInfoUpload &&
          (await Promise.all(
            values.additionalInfoUpload.map(file =>
              toBase64(file.originFileObj)
            )
          ))

        let inclusion = true
        let exclusion = false

        let screeningType

        if (values.HBV_treatment === 'Тийм') {
          screeningType = 'screening'
        } else if (values.HBV_treatment === 'Үгүй') {
          screeningType = 'preScreening'
        }

        if (
          [
            values.nativeLanguage,
            values.ableToTakeMedicine,
            values.isAdult,
            values.bodyMassIndex,
            values.hadBiopsy,
            values.hasApprovedContraception,
          ].includes('Үгүй')
        ) {
          inclusion = false
        }

        if (
          [
            values.otherClinicalTrial,
            values.hadLonafarnib,
            values.notPregnantOrNursingMother,
            values.childPhugh_BorC,
            values.spleenInvalid,
            values.toGetUpperEndoscopy,
            values.hewliinHundiiShingentei,
            values.entsefalopathy,
            values.busadHepatitis,
            values.hadLiverCancer,
            values.hasToxicHabit,
            values.aliNegOguulemjteiEseh,
            values.hetMedregTeswerguiOguulemteiEseh,
          ].some(item => item !== 'Үгүй')
        ) {
          exclusion = true
        }

        const result = await props.dispatch({
          type: 'practitioner_patient_profile/dlivrSaveQuestionnare',
          payload: {
            inclusion: inclusion,
            exclusion: exclusion,
            screeningType: screeningType,
            formValues: {
              ...values,
              uploadedAbdominoscopyResult: base64abdominoscopyResults,
              widenedStomach_Esophagus_Veins: base64widenedStomach_Esophagus_Veins,
              additionalInfoUpload: base64additionalInfoUpload,
            },
          },
        })

        return props.onSubmit(inclusion, exclusion, screeningType)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
      .finally(() => {
        setSubmitLoading(false)
      })
  }

  const onFieldsChange = () => {
    console.log('hi')
  }

  const handleHetMedregTeswerguiOguulemteiEseh = event => {
    if (event.target.value === 'Тийм') {
      setHetMedregTeswerguiOguulemjtei(true)
    } else {
      setHetMedregTeswerguiOguulemjtei(false)
    }

    return event.target.value
  }

  const handleHasApprovedContraception = event => {
    if (event.target.value === 'Тийм') {
      showContraceptionType(true)
    } else {
      showContraceptionType(false)
    }

    return event.target.value
  }

  const handleAliNegOguulemjteiEseh = event => {
    if (event.target.value === 'Тийм') {
      showAliNegOguulemj(true)
    } else {
      showAliNegOguulemj(false)
      props.form.setFieldsValue({
        aliNegOguulemj: undefined,
      })
    }

    return event.target.value
  }

  const handleHasToxicHabit = event => {
    if (event.target.value === 'Тийм') {
      setHasToxicHabit(true)
    } else {
      setHasToxicHabit(false)
    }

    return event.target.value
  }

  const normalizeFile = event => {
    if (Array.isArray(event)) {
      return event
    }
    return event && event.fileList
  }

  // const momentToISOString = momentObject => {
  //   console.log(momentObject)

  //   if (helper.isObject(momentObject)) {
  //     return momentObject.toISOString()
  //   }

  //   return
  // }

  return (
    <div className={styles.dlivr} style={{ marginTop: '16px' }}>
      <Form onFieldsChange={onFieldsChange}>
        <div style={{ margin: '32px 0' }}>
          <Divider>Оруулах</Divider>
        </div>

        <Row style={{ marginBottom: '16px' }} gutter={32}>
          <Col span={6}>Шалгуур</Col>
          <Col span={4}>Тайлбар</Col>
          <Col span={14}>Утга</Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />

        {/* 1 */}
        <Row gutter={32}>
          <Col span={6}>
            1.&nbsp;ХДВ архаг халдвар оношлогдоод хамгийн багадаа 6 сарын
            хугацаа болсон байх, анти-ХДВ эерэг, тоон полимеразын гинжин
            урвалаар ХДВ РНХ ≥ 500 IU/ml байгаа нь батлагдсан байх
          </Col>
          <Col span={4}>
            Liver center цахим систем дээрх Anti-HDV болон HDV-RNA шинжилгээний
            хариу байгаа хамгийн сүүлийн он сарын оруулна уу?
          </Col>
          <Col span={14}>
            Anti-HDV:
            <Form.Item>
              {getFieldDecorator('Anti_HDV', {
                rules: [{ required: true }],
                // getValueFromEvent: momentToISOString,
              })(<DatePicker />)}
            </Form.Item>
            HDV-RNA:
            <Form.Item>
              {getFieldDecorator('HDV_RNA', {
                rules: [{ required: true }],
                // getValueFromEvent: momentToISOString,
              })(<DatePicker />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 2 */}
        <Row gutter={32}>
          <Col span={6}>
            2.&nbsp; Эмчилгээг эхлэхийн өмнө Энтекавир эсвэл Тенофовиртай +
            Tенофовир алфанамид зэрэг ХВВ эсрэг нуклеот(з)идын эмчилгээг хамгийн
            багадаа 12 долоо хоногийн хугацаанд хийлгэн ХВВ-ДНХ илэрхий
            дарангуйлагдсан эсэх ({'<'}20 IU/ml)
          </Col>
          <Col span={4}>
            Тийм - Liver Center Цахим систем (эсвэл https://health.gov.mn/jor)
            эмчилгээ хэсэгт 3 сарын өмнөөс ХВВ-ийн эмийг ууж байгаа тэмдэглэл
            хангалттай байгаа эсэхийг анхаараарай
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('HBV_treatment', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 3 */}
        <Row gutter={32}>
          <Col span={6}>
            3.&nbsp; Ийлдсийн АЛАТ хэвийн дээд хязгаараас {'>'} 1,0 x ULN дахин
            их бөгөөд 10 дахинаас хэтрээгүй байх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем - Шинжилгээ -Биохими элэгний үйл ажиллагаа
            - хамгийн сүүлийн АЛАТ он сар өдөр оруулна уу?
          </Col>
          <Col span={14}>
            ALAT:
            <Form.Item>
              {getFieldDecorator('ALAT', {
                rules: [{ required: true }],
                // getValueFromEvent: momentToISOString,
              })(<DatePicker />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 4 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            4.&nbsp; Судалгаанд хамрагдах хүсэлтэй, судалгааны явцыг хүлээн
            зөвшөөрч таниулсан зөвшөөрлийн хуудсан дээр гарын үсэг зурсан байх
          </Col>
          <Col span={4}>
            Оруулах/Хасах шалгуурын дараа - эмнэлзүйн судалгааны зохицуулагчтай
            цаг товлогдоно
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 5 */}
        <Row gutter={32}>
          <Col span={6}>
            5.&nbsp; Өвчтөн тухайн нутгийнхаа хэлээр уншиж, ойлгох чадвартай
            байх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг - Өвчтөний боловсрол болон
            үзлэгийн дэлгэрэнгүй тэмдэглэлийг бүрэн оруулаарай
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('nativeLanguage', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 6 */}
        <Row gutter={32}>
          <Col span={6}>
            6.&nbsp; Эмийг өөрөө уух болон арьсан дор тарих аргаар хэрэглэх
            боломжтой байх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг - Үзлэгийн Дэлгэрэнгүй
            тэмдэглэлийг бүрэн оруулаарай
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('ableToTakeMedicine', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 7 */}
        <Row gutter={32}>
          <Col span={6}>
            7.&nbsp; 18 ба түүнээс дээш настай эмэгтэй, эрэгтэй хүйсийн хүмүүс
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг - Өвчтөний мэдээлэл
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('isAdult', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 8 */}
        <Row gutter={32}>
          <Col span={6}>
            8.&nbsp; Биеийн жингийн индекс ≥18кг/м2 ба 45 кг-аас илүү жинтэй
            байх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг - Эмчийн үзлэг-Амин үзүүлэлт
            Өндөр Жинг бүрэн оруулаарай
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('bodyMassIndex', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 9 */}
        <Row gutter={32}>
          <Col span={6}>
            9.&nbsp; Эмчилгээний үе эхлэхээс өмнө 45 хоногийн дотор хийгдсэн,
            элэгний архаг үрэвслийг илтгэсэн эдийн шинжилгээний хариу байх.
            Хэрвээ байхгүй бол биопсийн шинжилгээ хийлгэхийг зөвшөөрсөн мөн
            эсрэг заалтгүй байх
          </Col>
          <Col span={4}>
            Судалгаанд орох тохиолдолд биопси шинжилгээ 2 удаа өгөгдөхийг
            зөвшөөрч буй эсэх?
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('hadBiopsy', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />

        {/* 10 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            10.&nbsp; Зүрхний цахилгаан бичлэгт хурц ишеми, эмнэлзүйн ач
            холбогдол бүхий өөрчлөлт илрээгүй, Фридрекийн коррекцын томьёогоор
            засагдсан QT интервал(QTcF){'<'}450ms
          </Col>
          <Col span={4}>Илрүүлэгийн үзлэгээр хийгдэнэ</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 11 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            11.&nbsp; Нүдний уг дурандах шинжилгээгээр хэвийн байх
          </Col>
          <Col span={4}>Илрүүлэгийн үзлэгээр хийгдэнэ</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 12 */}
        <Row gutter={32}>
          <Col span={6}>
            12.&nbsp; Хүүхэд тээх чадвартай, идэвхтэй бэлгийн амьдралтай эмэгтэй
            оролцогч болон хүүхэд тээх чадвартай хамтрагчтай эрэгтэй оролцогчид
            судалгааны явцад жирэмслэлтээс хамгаалах зохих аргыг судалгааны
            туршид хэрэглэхийг зөвшөөрсөн байх
          </Col>
          <Col span={4}>
            Өвчтөн дараах жирэмслэлтээс хамгаалах аргуудаас аль нэгийг
            зөвшөөрсөн эсэх?
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('hasApprovedContraception', {
                rules: [{ required: true }],
                getValueFromEvent: handleHasApprovedContraception,
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {contraceptionTypeVisible && (
              <div>
                <Divider style={{ backgroundColor: '#999' }} />
                <div style={{ marginLeft: '16px' }}>
                  <Form.Item>
                    {getFieldDecorator('contraceptionType', {
                      rules: [{ required: true }],
                    })(
                      <Radio.Group>
                        <Radio
                          value={
                            'Илрүүлгээс ≥ 3 сарын өмнөөс овуляцийг хориглосоноор үйлдэл үзүүлдэг Прогестин суурилсан жирэмслэлтээс хамгаалах гормон (имплант, тарилга эсвэл уух). Прогестин суурилсан имплант эсвэл тарилга хэрэглэх нь илрүүлгийн үеэс эхлэн нэмэлт нэг хаалтын арга хэрэглэх ( бэлгэвч эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх ) шаардлагатай. Илрүүлгээс ≥ 3 сарын өмнөөс зөвхөн Прогестин суурилсан уухаар жирэмслэлтээс хамгаалах эм хэрэглэсэн бол илрүүлгийн үеэс эхлэн ДАВХАР хаалтын арга нэмэлтээр хэрэглэх (эрэгтэй партнер бэлгэвч хэрэглэх болон спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)'
                          }
                        >
                          Илрүүлгээс ≥ 3 сарын өмнөөс овуляцийг хориглосоноор
                          үйлдэл үзүүлдэг Прогестин суурилсан жирэмслэлтээс
                          хамгаалах гормон (имплант, тарилга эсвэл уух).
                          Прогестин суурилсан имплант эсвэл тарилга хэрэглэх нь
                          илрүүлгийн үеэс эхлэн нэмэлт нэг хаалтын арга хэрэглэх
                          ( бэлгэвч эсвэл спермицидтэй диафрагм эсвэл
                          спермицидтэй умайн хүзүүний хаалт хэрэглэх )
                          шаардлагатай. Илрүүлгээс ≥ 3 сарын өмнөөс зөвхөн
                          Прогестин суурилсан уухаар жирэмслэлтээс хамгаалах эм
                          хэрэглэсэн бол илрүүлгийн үеэс эхлэн ДАВХАР хаалтын
                          арга нэмэлтээр хэрэглэх (эрэгтэй партнер бэлгэвч
                          хэрэглэх болон спермицидтэй диафрагм эсвэл
                          спермицидтэй умайн хүзүүний хаалт хэрэглэх)
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio
                          value={
                            'Илрүүлгээс ≥3 сарын өмнөөс зэс утастай ерөндөг (IUD) эсвэл прогестронтой ерөндөг(IUS) суулгуулах болон илрүүлгийн үеэс эхлээд хаалтын аргыг нэмэлтээр хэрэглэх  ( бэлгэвч эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)'
                          }
                        >
                          Илрүүлгээс ≥3 сарын өмнөөс зэс утастай ерөндөг (IUD)
                          эсвэл прогестронтой ерөндөг(IUS) суулгуулах болон
                          илрүүлгийн үеэс эхлээд хаалтын аргыг нэмэлтээр
                          хэрэглэх ( бэлгэвч эсвэл спермицидтэй диафрагм эсвэл
                          спермицидтэй умайн хүзүүний хаалт хэрэглэх)
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio
                          value={
                            'Хамтрагчийг мэс заслын аргаар үр тогтоох чадваргүй болгох (илрүүлгээс ≥ 1 сарын өмнө үрийн суваг боох мэс засал хийх) болон (бэлгэвч эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)'
                          }
                        >
                          Хамтрагчийг мэс заслын аргаар үр тогтоох чадваргүй
                          болгох (илрүүлгээс ≥ 1 сарын өмнө үрийн суваг боох мэс
                          засал хийх) болон (бэлгэвч эсвэл спермицидтэй диафрагм
                          эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio
                          value={
                            'Илрүүлгээс эхлэн давхар хаалтын арга хэрэглэх (бэлгэвч эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)'
                          }
                        >
                          Илрүүлгээс эхлэн давхар хаалтын арга хэрэглэх (бэлгэвч
                          эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн
                          хүзүүний хаалт хэрэглэх)
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio
                          value={
                            'Эрэгтэй- Мэс заслын аргаар үр тогтоох чадваргүй болгох (илрүүлгээс ≥ 1 сарын өмнө үрийн суваг боох мэс засал хийх) болон илрүүлгээс эхлэн хаалтын арга хэрэглэх (бэлгэвч эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)'
                          }
                        >
                          Эрэгтэй- Мэс заслын аргаар үр тогтоох чадваргүй болгох
                          (илрүүлгээс ≥ 1 сарын өмнө үрийн суваг боох мэс засал
                          хийх) болон илрүүлгээс эхлэн хаалтын арга хэрэглэх
                          (бэлгэвч эсвэл спермицидтэй диафрагм эсвэл
                          спермицидтэй умайн хүзүүний хаалт хэрэглэх)
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio
                          value={
                            'Эрэгтэй- Илрүүлгээс эхлэн бэлгэвчийг тогтмол зөв хэрэглэх ба эмэгтэй хамтрагч нь жирэмслэлтээс хамгаалах дааврын болон дааврын бус хаалтын бус арга (зэс ерөндөг, IUD) болон дааврын бус хаалтын арга(бэлгэвч эсвэл спермицидтэй диафрагм эсвэл спермицидтэй умайн хүзүүний хаалт хэрэглэх)'
                          }
                        >
                          Эрэгтэй- Илрүүлгээс эхлэн бэлгэвчийг тогтмол зөв
                          хэрэглэх ба эмэгтэй хамтрагч нь жирэмслэлтээс
                          хамгаалах дааврын болон дааврын бус хаалтын бус арга
                          (зэс ерөндөг, IUD) болон дааврын бус хаалтын
                          арга(бэлгэвч эсвэл спермицидтэй диафрагм эсвэл
                          спермицидтэй умайн хүзүүний хаалт хэрэглэх)
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </div>
              </div>
            )}
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        <div style={{ margin: '32px 0' }}>
          <Divider>Хасах</Divider>
        </div>
        <Row style={{ marginBottom: '16px' }} gutter={32}>
          <Col span={6}>Шалгуур</Col>
          <Col span={4}>Тайлбар</Col>
          <Col span={14}>Утга</Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />

        {/* 1 */}
        <Row gutter={32}>
          <Col span={6}>
            1.&nbsp; Илрүүлэгт хамрагдахаас өмнө 30 хоногийн дотор эсвэл хагас
            задралын хугацаа-5 ямар нэг шинэ эмийн клиникийн судалгаанд оролцож
            байгаа эсэх
          </Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('otherClinicalTrial', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 2 */}
        <Row gutter={32}>
          <Col span={6}>
            2.&nbsp; Илрүүлэг болон илрүүлгийн өмнөх үед эсвэл судалгаа эхлэхээс
            12 сарын дотор Лонафарниб хэрэглэсэн эсэх
          </Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('hadLonafarnib', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 3 */}
        <Row gutter={32}>
          <Col span={6}>
            3.&nbsp; Жирэмсэн болон хөхүүл эмэгтэйчүүд
            <br />
            &nbsp;&nbsp; -Илрүүлгийн үед ийлдэс болон шээсэнд жирэмсний тест
            сөрөг байх ёстой (хамгийн багадаа мэдрэг чанар 25IU/ml эсвэл хүний
            хорионы гонадотропинтой эквивалиент түвшинд байх, эмчилгээ эхлэхээс
            24 цагийн дотор) Жирэмсэн хамтрагчтай бүх эрэгтэй өвчтнүүд
            хасагдана'
          </Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('notPregnantOrNursingMother', {
                rules: [{ required: true }],
              })(
                <Radio.Group
                  options={['Жирэмсэн/хөхүүл', 'Эхнэр жирэмсэн/хөхүүл', 'Үгүй']}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 4 */}
        <Row gutter={32}>
          <Col span={6}>
            4.&nbsp; Одоо эсвэл өмнө нь элэгний хатуурлын ээнэгшлээ алдсан
            байгаа эсэх (Чайлд Пью ангилал B эсвэл С)
            <div>
              &nbsp;&nbsp;Чайлд Пью А гэж ангилагдсан (5 оноотой), ээнэгшилтэй
              бол судалгаанд орохыг зөвшөөрнө
            </div>
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг - Эмчийн үзлэг-Онош Child
            Pugh Score заавал бодоорой
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('childPhugh_BorC', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 5 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            5.&nbsp; ХДХВ эсвэл ХСВ -ийн хавсарсан халдвартай өвчтнүүдийн хувьд
            ХДХВ-РНХ болон ХСВ-РНХ тус тус илэрч байгаа бол
          </Col>
          <Col span={4}>Илрүүлэгийн үзлэгээр хийгдэнэ</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 6 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            6.&nbsp; Илрүүлгийн шинжилгээнд ХСВ болон ХДХВ эсрэг бие илэрсэн
            байх. ХСВ илэрсэн ч вирүсийн эмчилгээ хийгдэн ХСВ-РНХ тоологдоогүй
            нь бүртгэгдээд хамгийн багадаа 3 сар болсон байх
          </Col>
          <Col span={4}>Илрүүлэгийн үзлэгээр хийгдэнэ</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 7 */}
        <Row gutter={32}>
          <Col span={6}>
            7.&nbsp; Элэгний венийн судасны даралтын градиент илэрхий ихэссэн нь
            батлагдсан (≥10mmHg), улаан хоолой, хэвлийн венийн судасны
            өргөсөлтэй байсан өгүүлэмжтэй, дэлүүний урт {'>'}12 см хэмжигдсэн
            (дэлүү
            {'>'}12см хэмжигдсэн ч бусад элэгний хатуурлын үзүүлэлтүүд хэвийн
            байвал судалгаанд оролцуулах талаар судалгааны баг хэлэлцэнэ)
          </Col>
          <Col span={4}>
            Хэвлийн ЭХО өвчтөн хийлгэсэн эсэх Ходоод улаан хоолойн дурандуулах
            шинжилгээ-Paper based
          </Col>
          <Col span={14}>
            Spleen {'>'} 12 cm:
            <Form.Item>
              {getFieldDecorator('spleenInvalid', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Divider style={{ backgroundColor: '#999' }} />
            Хэвлийн ЭХО upload Ходоод, улаан хоолой, хэвлийн венийн судасны
            өргөсөлтэй
            <Form.Item>
              {getFieldDecorator('uploadedAbdominoscopyResult', {
                rules: [{ required: true }],
                getValueFromEvent: normalizeFile,
              })(
                <Upload
                  // transformFile={file => getBase64(file, console.log)}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              )}
            </Form.Item>
            <Divider style={{ backgroundColor: '#999' }} />
            Ходоод, улаан хоолой, хэвлийн венийн судасны өргөсөлтэй:
            <Form.Item>
              {getFieldDecorator('widenedStomach_Esophagus_Veins', {
                rules: [{ required: true }],
                getValueFromEvent: normalizeFile,
              })(
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              )}
            </Form.Item>
            <Divider style={{ backgroundColor: '#999' }} />
            Ходоод улаан хоолой дурандуулах:
            <Form.Item>
              {getFieldDecorator('toGetUpperEndoscopy', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 8 */}
        <Row gutter={32}>
          <Col span={6}>
            8.&nbsp; Шээс хөөх эм болон хэвлийн хөндийн хатгалт хийх
            шаардлагатай хэвлийн хөндийн асцит үүссэн байгаа эсвэл элэгний
            энцефалопати одоо байгаа өмнө нь үүсч байсан нь батлагдсан.
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг - Өвчтөний боловсрол болон
            үзлэгийн дэлгэрэнгүй тэмдэглэлийг бүрэн оруулаарай
          </Col>
          <Col span={14}>
            Хэвлийн хөндийд шингэн үүсч байсан эсэх эсвэл одоо шингэнтэй эсэх:
            <Form.Item>
              {getFieldDecorator('hewliinHundiiShingentei', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Divider style={{ backgroundColor: '#999' }} />
            Энцефалопати үүсч байсан эсэх эсвэл одоо энцефалопати байгаа эсэх:
            <Form.Item>
              {getFieldDecorator('entsefalopathy', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 9 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            9.&nbsp; Доорх шинжилгээний өөрчлөлтүүдийн аль нэг илэрсэн:
            <div>- Ялтас эсийн тоо {'<'}90,000 эс/мм3</div>
            <div>- Цагаан эсийн тоо {'<'}3000 эс/мм3</div>
            <div>- Нейтрофилийн тоо {'<'}1500 эс/мм3</div>
            <div>
              - Гемоглобин {'<'}11 г/дл (эмэгтэй) {'<'}12 г/дл(эрэгтэй)
            </div>
            <div>
              - Креатинин клиренс {'<'}
              30мл/мин (Cockroft-Gault)
            </div>
            <div> - Альфафетопротейн ≥100нг/мл</div>
            <div>
              - Бамбай идэвхжүүлэгч даавар (TSH) эсвэл нийт тироксин даавар (T4)
              өөрчлөлттэй гарсан (дааврын үйл ажиллагааны хяналт сайн өвчтөн
              судалгааны зохицуулагчтай хэлэлцэн оролцож болно)
            </div>
          </Col>
          <Col span={4}>Илрүүлэгийн үзлэгээр хийгдэнэ</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />

        {/* 10 */}
        <Row gutter={32}>
          <Col span={6}>
            10.&nbsp; Бусад төрлийн вирүсийн хепатит, элэгний бусад өвчнүүд
            (аутоиммунийн хепатит, билиар цирроз, анхдагч хатуурлын холангит,
            Вилсоны өвчин, архины шалтгаант элэгний өвчин, архины бус шалтгаант
            элэгний өөхлөлт, гемохроматоз, альфа-1-антитрипсин дутагдал) байгаа
            тохиолдолд
          </Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('busadHepatitis', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            (Тийм - аутоиммунийн хепатит, билиар цирроз, анхдагч хатуурлын
            холангит, Вилсоны өвчин, архины шалтгаант элэгний өвчин, архины бус
            шалтгаант элэгний өөхлөлт, гемохроматоз, альфа-1-антитрипсин
            дутагдал)
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 11 */}
        <Row gutter={32}>
          <Col span={6}>11.&nbsp; Элэгний хавдраар өвчилсөн өгүүлэмжтэй</Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('hadLiverCancer', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 12 */}
        <Row gutter={32}>
          <Col span={6}>
            12.&nbsp; Хорт зуршил
            <ul>
              <li>
                Хоол идэх дурын эмгэг (сэтгэцийн эмгэгийн оношилгоо,
                статистикийн гарын авлага DSM5)
              </li>
              <li>
                Архины хэрэглээний эмгэг
                <ul>
                  <li>20 г/өдөрт (эмэгтэй) 1,5 стандарт уулт</li>
                  <li>30 г/өдөрт (эрэгтэй) 2 стандарт уулт</li>
                </ul>
                <div>* 1 стандарт уулт нь 14 гр архи агуулна</div>
                <div>- 355мл пиво, 148 мл вино, 44 мл спирт</div>
              </li>

              <li>Цусан дах алкохол концентраци {'>'}0.08%</li>
              <li>
                Илрүүлгээс өмнө 6 сарын хугацаанд хар тамхинд донтох эмгэгтэй
                (каннабис болон түүний бүлгээс бусад)
              </li>
            </ul>
          </Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('hasToxicHabit', {
                rules: [{ required: true }],
                getValueFromEvent: handleHasToxicHabit,
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {hasToxicHabit && (
              <div>
                <Divider style={{ backgroundColor: '#999' }} />
                <div style={{ marginLeft: '16px' }}>
                  <Form.Item>
                    {getFieldDecorator('toxicHabitType', {
                      rules: [{ required: true }],
                    })(
                      <Radio.Group>
                        <Radio
                          value={
                            'Хоол идэх дурын эмгэг (сэтгэцийн эмгэгийн оношилгоо, статистикийн гарын авлага DSM5)'
                          }
                        >
                          Хоол идэх дурын эмгэг (сэтгэцийн эмгэгийн оношилгоо,
                          статистикийн гарын авлага DSM5)
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio value={'Архины хэрэглээний эмгэг'}>
                          Архины хэрэглээний эмгэг
                        </Radio>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Radio
                          value={
                            'Илрүүлгээс өмнө 6 сарын хугацаанд хар тамхинд донтох эмгэгтэй (каннабис болон түүний бүлгээс бусад)'
                          }
                        >
                          Илрүүлгээс өмнө 6 сарын хугацаанд хар тамхинд донтох
                          эмгэгтэй (каннабис болон түүний бүлгээс бусад)
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </div>
              </div>
            )}
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />

        {/* 13 */}
        <Row gutter={32}>
          <Col span={6}>
            13.&nbsp;Өмнө болон одоо доорхын аль нэг өгүүлэмжтэй байсан бол
          </Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('aliNegOguulemjteiEseh', {
                rules: [{ required: true }],
                getValueFromEvent: handleAliNegOguulemjteiEseh,
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <div>
              <Divider style={{ backgroundColor: '#999' }} />
              <div style={{ marginLeft: '16px' }}>
                <Form.Item>
                  {getFieldDecorator('aliNegOguulemj', {
                    rules: [{ required: aliNegOguulemjVisible ? true : false }],
                  })(
                    <Radio.Group disabled={!aliNegOguulemjVisible}>
                      <Radio
                        value={
                          "Дааврын бус үрэвслийн эсрэг эмийг тогтмол хэрэглэх шаардлагатй байдаг эсвэл илрүүлгээс 6 сарын өмнө системийн кортикостеройд тогтмол хэрэглэсэн дархлаа хамааралт эмгэгүүд (ревматойд артрит, гэдэсний үрэвсэлт өвчин, хүнд псориаз, системийн чонон яр) Үүнд гуурсан хоолойн багтрааны цацлага хэрэглэх болон үе үе амаар стеройд хэрэглэх хамаарахгүй.'}> Дааврын бус үрэвслийн эсрэг эмийг тогтмол хэрэглэх шаардлагатй байдаг эсвэл илрүүлгээс 6 сарын өмнө системийн кортикостеройд тогтмол хэрэглэсэн дархлаа хамааралт эмгэгүүд (ревматойд артрит, гэдэсний үрэвсэлт өвчин, хүнд псориаз, системийн чонон яр) Үүнд гуурсан хоолойн багтрааны цацлага хэрэглэх болон үе үе амаар стеройд хэрэглэх хамаарахгүй."
                        }
                      >
                        Дааврын бус үрэвслийн эсрэг эмийг тогтмол хэрэглэх
                        шаардлагатй байдаг эсвэл илрүүлгээс 6 сарын өмнө
                        системийн кортикостеройд тогтмол хэрэглэсэн дархлаа
                        хамааралт эмгэгүүд (ревматойд артрит, гэдэсний үрэвсэлт
                        өвчин, хүнд псориаз, системийн чонон яр) Үүнд гуурсан
                        хоолойн багтрааны цацлага хэрэглэх болон үе үе амаар
                        стеройд хэрэглэх хамаарахгүй.
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={'Нүдний торлог бүрхэвчийн эмгэг оношлогдсон'}
                      >
                        Нүдний торлог бүрхэвчийн эмгэг оношлогдсон
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={
                          'Илрүүлгээс өмнөх 5 жилийн дотор ямар нэг хавдар оношлогдсон. Мэс засал хийлгэн бүрэн засралд орсон, сүүлийн 5 жилд дахиагүй хорт хавдартай өвчтнийг хасах шалгуурт оруулахгүй (хөхний цоргын эсийн түвшин дэх хавдар /cancer in situ/, арьсны суурийн болон хучуур эсийн хавдар эмчилгээгээр бүрэн засралд орсон, умайн хүзүүний эсийн түвшиний хавдар амжилттай эмчлэгдсэн бол)'
                        }
                      >
                        Илрүүлгээс өмнөх 5 жилийн дотор ямар нэг хавдар
                        оношлогдсон. Мэс засал хийлгэн бүрэн засралд орсон,
                        сүүлийн 5 жилд дахиагүй хорт хавдартай өвчтнийг хасах
                        шалгуурт оруулахгүй (хөхний цоргын эсийн түвшин дэх
                        хавдар /cancer in situ/, арьсны суурийн болон хучуур
                        эсийн хавдар эмчилгээгээр бүрэн засралд орсон, умайн
                        хүзүүний эсийн түвшиний хавдар амжилттай эмчлэгдсэн бол)
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={
                          'Кардиомиопати эсвэл зүрхний илэрхий цусан хангамжийн дутагдал, тархины судасны өвчнүүд (зүрхний бах, зүрхний булчингийн шигдээс эсвэл судасны ангиографийн эмчилгээнд орж байсан)'
                        }
                      >
                        Кардиомиопати эсвэл зүрхний илэрхий цусан хангамжийн
                        дутагдал, тархины судасны өвчнүүд (зүрхний бах, зүрхний
                        булчингийн шигдээс эсвэл судасны ангиографийн эмчилгээнд
                        орж байсан)
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={
                          'Үйл ажиллагааны дутагдал үүссэн амьсгалын замын архаг өвчин (жишээ нь: Уушигны архаг бөглөрөлтөт өвчин) 1 секундын хүчилж гаргах амьсгалын эзэлхүүнийг хүчилсэн амьдралын багтаамжид харьцуулахад <0.7 байх'
                        }
                      >
                        Үйл ажиллагааны дутагдал үүссэн амьсгалын замын архаг
                        өвчин (жишээ нь: Уушигны архаг бөглөрөлтөт өвчин) 1
                        секундын хүчилж гаргах амьсгалын эзэлхүүнийг хүчилсэн
                        амьдралын багтаамжид харьцуулахад {'<'}0.7 байх
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={'Нойр булчирхай болон бүдүүн гэдэсний үрэвсэл'}
                      >
                        Нойр булчирхай болон бүдүүн гэдэсний үрэвсэл
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={
                          'Хүнд эсвэл хяналтгүй сэтгэцийн эмгэгүүд (сэтгэл гутрал, солиорол, психоз, цочмог, архаг танин мэдэхүйн өөрчлөлт, амиа хорлох зан төрх, амиа хорлох оролдлого хийж байсан, мансууруулах бодисын донтолт дахиж байсан)'
                        }
                      >
                        Хүнд эсвэл хяналтгүй сэтгэцийн эмгэгүүд (сэтгэл гутрал,
                        солиорол, психоз, цочмог, архаг танин мэдэхүйн өөрчлөлт,
                        амиа хорлох зан төрх, амиа хорлох оролдлого хийж байсан,
                        мансууруулах бодисын донтолт дахиж байсан)
                      </Radio>
                      <Divider style={{ backgroundColor: '#999' }} />
                      <Radio
                        value={
                          'Ясны чөмөг болон цул эрхтэн шилжүүлэн суулгуулсан (эрхтэн шилжүүлэн суулгуулсаны дараа 1 жил тогтвортой байгаа, дархлаа дарангуйлах эмчилгээ шаардлагагүй өвчтнүүдийг хамруулж болно.)'
                        }
                      >
                        Ясны чөмөг болон цул эрхтэн шилжүүлэн суулгуулсан
                        (эрхтэн шилжүүлэн суулгуулсаны дараа 1 жил тогтвортой
                        байгаа, дархлаа дарангуйлах эмчилгээ шаардлагагүй
                        өвчтнүүдийг хамруулж болно.)
                      </Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 14 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            14.&nbsp; Судалгааны явцад ямар нэгэн байдлаар бусад эмчилгээ
            хийлгэх шаардлага гарах магадлалтай тодорхой эмгэгүүд. Эмнэлзүйн
            мониторын үзэж буйгаар судалгааны үр дүнг үнэлэхэд төвөг учруулж,
            урьдчилан төлөвлөсөн эмчилгээ болон хяналтыг бүрэн гүйцэд хийх
            боломжгүй болох эрсдэлтэй ямар нэгэн төрлийн хүнд хэлбэрийн эмгэг
            бүхий өвчтнүүд. Өвчтний хувьд судалгаанд орох нь мөн тэдний
            эрсдэлийг нэмэгдүүлэх бол
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- Урьд өвчилсөн өвчин эмгэгийн
            байдал хэсгийг бөглөөрөй
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 15 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            15.&nbsp; Эмийн шимэгдэлтэнд нөлөөлж болзошгүй өөрчлөлтүүд (жишээ нь
            богино гэдэсний хам шинж, бүдүүн гэдэсний үрэвсэл, хатингаршилт
            ходоодны үрэвсэл, ходоод тайруулах мэс засалд орсон) гарсан хүмүүс
            судалгааны хянагчтай хэлэлцэнэ.
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- Урьд өвчилсөн өвчин эмгэгийн
            байдал- Мэс заслын хэсгээ бөглөөрөй
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 16 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            16.&nbsp;Эмнэлзүйн Хянагчаар зөвшөөрөгдөөгүй ямар ч жороор болон,
            жоргүй авах бүтээгдэхүүн (OTC), эсвэл ургамлын гаралтай бүтээгдэхүүн
            (Хавсарсан эмчилгээний гарын авлагыг харна уу)
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- амьдралын түүх эмийн
            хэрэглээ/Эмчилгээ хэсгийг бөглөөрөй
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 17 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            17.&nbsp; Анхны суурь түвшин (Өдөр 1)-ээс 14 хоног дотор усан үзэм
            эсвэл исгэлэн жүрж эсвэл эдгээрийг агуулсан бүтээгдэхүүн хэрэглэсэн
            бол.
          </Col>
          <Col span={4}>Өвчтөнд ирүүлгийн дараах хэсэгт сануулах</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 18 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            18.&nbsp;Судалгааны үе болон скринингийн үеэс 12 сарын дотор дархлаа
            зохицуулагч эмийн бүтээгдэхүүнүүд, ИФН-α (жишээлбэл: ИФН- α -2a
            эсвэл ИФН- α -2b, эсвэл ПЕГ-ИФН- α -2a эсвэл альфу-2b), цитотоксик
            эмүүд, эсвэл архаг системийн кортикостеройд эмчилгээ хэрэглэсэн бол
            <div>
              • Астмын хяналтанд үе үе амаар болон цацлагаар хэрэглэх
              кортикостеройд зөвшөөрөгдөнө
            </div>
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- амьдралын түүх эмийн
            хэрэглээ/Эмчилгээ
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 19 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            19.&nbsp;Эмчилгээний явцад гепарин болон варфарин хэрэглэх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- Урьд өвчилсөн өвчин эмгэгийн
            байдал
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 20 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            20.&nbsp;Системийн антибиотик, мөөгөнцрийн эсрэг эм, вирүсийн эсрэг
            эмийг судалгааны санамсаргүй түүвэрлэлтийн өмнө 14 хоног дотор
            хэрэглэсэн эсвэл цаашид хэрэглэх шаардлагатай эмгэгтэй
          </Col>
          <Col span={4}>Өвчтөнд ирүүлгийн дараах хэсэгт сануулах</Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 21 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            21.&nbsp;Cудалгааны өмнө удаан хугацаанд ({'>'}2 долоо хоног) эсвэл
            эмчилгээний явцад бөөр болон элэг гэмтээх өндөр эрсдэлтэй эмүүдийг
            судалгааны хянагчаас зөвшөөрөл авалгүйгээр хэрэглэх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- амьдралын түүх эмийн
            хэрэглээ/Эмчилгээ
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />

        {/* 22 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            22.&nbsp;Илрүүлгийн өмнө 3 сар эсвэл судалгааны үеэр дархлаа
            дарангуйлах эмчилгээ хийлгэх
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- амьдралын түүх эмийн
            хэрэглээ/Эмчилгээ
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 23 */}
        <Row gutter={32}>
          <Col span={6}>
            23.&nbsp;ЛНФ, РТВ, ПЕГ ИНФ альфа 2а болон ЭТВ, ТДФ, ТАФ бусад
            хэрэглэгдэх эмүүдэд хэт мэдрэг, тэсвэргүй өгүүлэмжтэй мөн нотлогдсон
          </Col>
          <Col span={4}>
            Дээрх эмүүдийг аль нэгийг хэрэглэхэд гаж нөлөө гарч байсан эсэх?
          </Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('hetMedregTeswerguiOguulemteiEseh', {
                rules: [{ required: true }],
                getValueFromEvent: handleHetMedregTeswerguiOguulemteiEseh,
              })(
                <Radio.Group>
                  <Radio value={'Тийм'}>Тийм</Radio>
                  <Radio value={'Үгүй'}>Үгүй</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            {hetMedregTeswerguiOguulemtei && (
              <div>
                <Divider style={{ backgroundColor: '#999' }} />
                <div style={{ marginLeft: '16px' }}>
                  <Form.Item>
                    {getFieldDecorator('medregTeswerguiOguulemj', {
                      rules: [{ required: true }],
                    })(
                      <Radio.Group>
                        <Row type="flex">
                          <Col>
                            <Radio value={'LNF'}>ЛНФ</Radio>
                          </Col>
                          <Col>
                            <Radio value={'RTW'}>РТВ</Radio>
                          </Col>
                          <Col>
                            <Radio value={'PEG_INF_Alpha2a'}>
                              ПЕГ ИНФ альфа 2а
                            </Radio>
                          </Col>
                        </Row>
                        <Divider style={{ backgroundColor: '#999' }} />
                        <Row type="flex">
                          <Col>
                            <Radio value={'ETW'}>ЭТВ</Radio>
                          </Col>
                          <Col>
                            <Radio value={'TDF'}>ТДФ</Radio>
                          </Col>
                          <Col>
                            <Radio value={'TAF'}>ТАФ</Radio>
                          </Col>
                        </Row>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </div>
              </div>
            )}
          </Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 24 */}
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            24.&nbsp; Эм (жор, эмийн бэлдмэл, ургамлын гаралтай бүтээгдэхүүн)
            эсвэл хоол хүнсийг дараах байдлаар (1-р өдрөөс хойш 2 долоо хоногийн
            өмнөөс эхлээд, судалгааны ажлын туршид) хавсран хэрэглэх:
            <ul>
              <li>
                CYP3A-ийн хүчтэй дарангуйлагчид, түүний дотор статинууд
                (правастатин ба флувастатиныг эс тооцвол);
              </li>
              <li>CYP3A эсвэл CYP3A мэдрэмтгий субстратын хүчтэй индукц;</li>
              <li>
                Нарийн эмчилгээний индекс бүхий CYP2C19 ба P-gp мэдрэмтгий
                субстратууд - нэмэлт зааварчилгааг Хавсран хэрэглэх эмийн
                заавраас үзнэ үү;
              </li>
              <li>Нарийн эмчилгээний индекс бүхий OCT1 эмзэг субстрат;</li>
              <li>
                Хэрэв энэ протоколд өөрөөр заагаагүй бол PR эсвэл QT интервалыг
                уртасгадаг мэдэгдэж буй эмүүд.
              </li>
            </ul>
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- амьдралын түүх эмийн
            хэрэглээ/Эмчилгээ
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        <Row gutter={32} style={{ backgroundColor: '#eee' }}>
          <Col span={6}>
            25.&nbsp; РТВ, ПЕГ ИНФ альфа 2а, ЭТВ, ТДФ, ТАФ эмүүдийг хэрэглэж
            байхад эсрэг заалттай эмүүд
          </Col>
          <Col span={4}>
            Liver Center Цахим систем эмчийн үзлэг- амьдралын түүх эмийн
            хэрэглээ/Эмчилгээ
          </Col>
          <Col span={14}></Col>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 26 */}
        <Row gutter={32}>
          <Col span={6}>26.&nbsp;Нэмэлт тайлбар</Col>
          <Col span={4}></Col>
          <Col span={14}>
            <Form.Item>
              {getFieldDecorator('additionalInfo', {
                rules: [{ required: false }],
              })(<Input.TextArea />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('additionalInfoUpload', {
                rules: [{ required: false }],
                getValueFromEvent: normalizeFile,
              })(
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="end" style={{ marginTop: '32px' }}>
          {/* <Button type="primary" htmlType="submit">
            Хадгалах
          </Button> */}
          <ConfirmModal
            key="edit-save-button"
            {...{
              showButtonProps: {
                className: 'button-red uppercase',
                // disabled: !formComplete,
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <Trans id="Save" />
                </span>
              ),
              onConfirm: handleSubmit,
              loading: submitLoading,
            }}
          />
          ,
        </Row>
      </Form>
    </div>
  )
}

// function getBase64(file) {
//   console.log(file)
//   let reader = new FileReader()
//   reader.readAsDataURL(file)
//   reader.onload = function(e) {
//     return reader.result
//   }
//   reader.onerror = function(error) {
//     console.log('Error: ', error)
//   }
// }

InclusionExclusionForm.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(InclusionExclusionForm)))
