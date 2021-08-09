const express = require('express')
const helper = require('@helper')

const DrugInfoModel = helper.modelLoader('drugInfo')

const router = new express.Router()

router.get('/drugInfo', async (req, res) => {
  const { internationalProprietaryName, proprietaryName } = req.query

  console.log(req)
  console.log(req.query)

  try {
    const result = await DrugInfoModel.find({
      $or: [
        {
          'InternationalProprietaryName.designation.value': {
            $regex: '^' + internationalProprietaryName,
            $options: 'i',
          },
        },
        {
          'ProprietaryName.designation.value': {
            $regex: '^' + proprietaryName,
          },
        },
      ],
    })

    const resultObjects = result.map(res => res.toObject())

    return res.status(200).send({
      success: true,
      data: resultObjects,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).send({
      success: false,
      message: 'Search operation failed',
    })
  }
})

router.get('/drugInformationList', async (req, res) => {
  if (!!req.query) {
    const filterList = []

    Object.values(req.query).forEach(queryEntry => {
      console.log('medication request query entry', queryEntry)

      try {
        const coding = queryEntry.coding.find(v => v.system)

        filterList.push({
          'code.coding.system': coding.system,
          'code.coding.code': coding.code,
          'code.coding.display': coding.display,
        })
      } catch (error) {
        console.log('drugInfo has not coding element')
      }
    })

    if (filterList.length === 0) {
      return res.status(200).send({
        success: true,
        message: 'No drug is containing coding element',
        data: [],
      })
    }
    const drugInformationList = await DrugInfoModel.find({
      $or: [...filterList],
    })

    const resDrugInformatioList = drugInformationList.map(drug => drug.toJSON())

    return res.status(200).send({
      success: true,
      data: resDrugInformatioList,
    })
  } else {
    return res.status(200).json({
      success: true,
      message: 'query is undefined',
      data: [],
    })
  }
})

module.exports = router
