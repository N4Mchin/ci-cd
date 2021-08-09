const express = require('express')
const helper = require('@helper')

const icdModel = helper.modelLoader('icd9')

const router = new express.Router()

router.get('/icd/9', async (req, res) => {
  const { designationEn, designationMn } = req.query

  console.log(req.query)

  try {
    const result = await icdModel.find({
      $or: [
        {
          'designation.value': {
            $regex: '^' + designationEn,
            $options: 'i',
          },
        },
        {
          'designation.value': {
            $regex: '^' + designationMn,
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

router.get('/icd/9/list', async (req, res) => {
  try {
    const filterList = []

    Object.values(req.query).forEach(queryEntry => {
      console.log(queryEntry)
      const coding = queryEntry.coding.find(v => v.system)

      filterList.push({
        'code.coding.system': coding.system,
        'code.coding.code': coding.code,
        'code.coding.display': coding.display,
      })
    })

    const icd9list = await icdModel.find({
      $or: [...filterList],
    })

    const resIcd9list = icd9list.map(drug => drug.toJSON())

    return res.status(200).send({
      success: true,
      data: resIcd9list,
    })
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: true,
      message: 'Do nothing',
    })
  }
})

module.exports = router
