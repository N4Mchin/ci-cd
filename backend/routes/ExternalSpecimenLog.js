const express = require('express')
const helper = require('@helper')
const CONFIG = require('@config')
const ExternalSpecimenLogModel = helper.modelLoader('ExternalSpecimenLog')
const excelGenerator = require('@services/excelgenerator')
const translator = require('@services/translator')

const router = new express.Router()

router.get('/externalSpecimenLog', async (req, res) => {
  const { startDate, endDate, _page, _count } = req.query

  let query = {}
  if (req.query.searchValue) {
    query = {
      $or: [
        { 'patientInfo.nationalIdentificationNumber': req.query.searchValue },
        { barcode: req.query.searchValue },
      ],
    }
  } else if (req.query.organizationStates) {
    query['organization.address.state'] = {
      $in: req.query.organizationStates,
    }
  } else if (startDate && endDate) {
    query = {
      _createdAt: {
        $gte: new Date(new Date(startDate).toISOString()),
        $lte: new Date(new Date(endDate).toISOString()),
      },
    }
  }

  const externaSamples = await ExternalSpecimenLogModel.aggregate([
    {
      $match: query,
    },
    {
      $facet: {
        results: [
          {
            $skip: Number(_count) * (_page - 1),
          },
          {
            $limit: Number(_count || CONFIG.PAGE_SIZE),
          },
        ],
        details: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
            },
          },
        ],
      },
    },
  ])

  let total
  if (externaSamples[0].details[0] && externaSamples[0].results[0]) {
    total = externaSamples[0].details[0].count
  } else {
    total = 0
  }

  return res.status(200).send({
    success: true,
    data: externaSamples[0].results,
    total: total,
  })
})

// Excel Download
router.get('/externalSpecimenLog/excel', async (req, res) => {
  const result = await ExternalSpecimenLogModel.find()

  const columns = [
    {
      title: translator('identifier', 'mn'),
      dataIndex: 'identifier',
    },
    {
      title: translator('Захиалгын дугаар', 'mn'),
      dataIndex: 'requisition.value',
    },
    {
      title: translator('Төлөв', 'mn'),
      dataIndex: 'status',
    },
    {
      title: translator('Баркод', 'mn'),
      dataIndex: 'barcode',
    },
    {
      title: translator('Овог', 'mn'),
      dataIndex: 'lastName',
    },
    {
      title: translator('Нэр', 'mn'),
      dataIndex: 'firstName',
    },
    {
      title: translator('Регистрийн дугаар', 'mn'),
      dataIndex: 'NInum',
    },
    {
      title: translator('Нас', 'mn'),
      dataIndex: 'age',
    },
    {
      title: translator('Хүйс', 'mn'),
      dataIndex: 'gender',
    },
    {
      title: translator('эмд', 'mn'),
      dataIndex: 'gender1',
    },
    {
      title: translator('утас', 'mn'),
      dataIndex: 'PhoneNumber',
    },
    {
      title: translator('Сорьцын дугаар', 'mn'),
      dataIndex: 'SampleAccessionIdentifier',
    },
    {
      title: translator('Сорьцын хэмжээ', 'mn'),
      dataIndex: 'SpecimenSize',
    },
    {
      title: translator('Сорьцыг хэдэн градуст хэд хоног хадгалсан', 'mn'),
      dataIndex: 'SpecimenSave',
    },
    {
      title: translator('Илрүүлэх шинжилгээний хариу', 'mn'),
      dataIndex: 'TestResult',
    },
    {
      title: translator('Ямар шинжилгээ хийлгэх', 'mn'),
      dataIndex: 'testNames',
    },
    {
      title: translator('Сорьц илгээх үеийн хайрцагны температур', 'mn'),
      dataIndex: 'SampleSentTemprature',
    },
    {
      title: translator('Сорьц илгээсэн он сар өдөр', 'mn'),
      dataIndex: 'SampleSentDate',
    },
    {
      title: translator('орьц илгээсэн хүний нэр, гарын үсэг', 'mn'),
      dataIndex: 'SampleSentPersonName',
    },
  ]

  const titleArray = columns.map(column => column.title)

  const arrayOfArray = [titleArray]

  result.forEach(element => {
    const rowArray = []
    let obj = element.toObject()
    columns.forEach(column => {
      let value
      if (column.dataIndex === 'requisition.value') {
        value = obj.requisition.value
      } else {
        value = obj[column.dataIndex]
      }
      rowArray.push(value)
    })
    arrayOfArray.push(rowArray)
  })

  const excelDataPath = excelGenerator(arrayOfArray)
  return res.download(excelDataPath)
})

router.put('/externalSpecimenLog', async (req, res) => {
  const updatePromises = req.body.dataSource.map(item => {
    const { _id } = item

    return ExternalSpecimenLogModel.findByIdAndUpdate(_id, item, {
      new: true,
    })
  })

  try {
    await Promise.all(updatePromises)
    return res.status(200).send({
      success: true,
      data: {},
    })
  } catch (error) {
    return res.status(200).send({
      success: false,
      data: error,
    })
  }
})

module.exports = router
