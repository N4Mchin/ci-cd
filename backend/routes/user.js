const express = require('express')
const jwt = require('jsonwebtoken')
const CONFIG = require('@config')
const fhirService = require('@services/fhir')
const helper = require('@helper')
const UserModel = helper.modelLoader('user')
const {
  organization: Organization,
  practitioner: Practitioner,
  practitionerrole: PractitionerRole,
} = require('@schemas')

const Identifiers = require('@constants/Identifiers')

const router = new express.Router()

router.get('/users', async (req, res) => {
  const { _page, _count } = req.query

  const userDocuments = await UserModel.aggregate([
    {
      $match: {
        'permission.role': { $ne: CONFIG.ROLE_TYPE.PATIENT },
      },
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

  return res.status(200).json({
    success: true,
    data: userDocuments[0].results,
    total: userDocuments[0].details[0].count,
  })
})

router.get('/user/privateInfo', async (req, res) => {
  const data = {
    ...req.user,
  }

  const { permission, patientId, practitionerId } = req.user

  if (
    [
      CONFIG.ROLE_TYPE.RECEPTIONIST,
      CONFIG.ROLE_TYPE.PHLEBOTOMIST,
      CONFIG.ROLE_TYPE.LABORATORY_TECHNICIAN,
      CONFIG.ROLE_TYPE.EXTERNAL_RECEPTIONIST,
      CONFIG.ROLE_TYPE.SENIOR_LABORATORY_TECHNICIAN,
      CONFIG.ROLE_TYPE.PRACTITIONER,
    ].includes(permission.role)
  ) {
    try {
      const bundleResponse = await fhirService.getResource('Practitioner', {
        _id: practitionerId,
        _revinclude: ['PractitionerRole:practitioner'],
        '_include:iterate': ['PractitionerRole:organization'],
      })

      const bundle = bundleResponse.data

      const resourceArray = fhirService.loadResourceArray(
        bundle.entry.map(bundleEntry => bundleEntry.resource)
      )

      // PractitionerRole has only one practitioner and one organzation reference
      const practitioner = resourceArray.find(
        resource =>
          resource.resourceType === 'Practitioner' &&
          resource.id === practitionerId
      )
      const practitionerRole = resourceArray.find(
        resource => resource.resourceType === 'PractitionerRole'
      )
      const organization = resourceArray.find(
        resource => resource.resourceType === 'Organization'
      )

      Object.assign(data, {
        practitioner,
        practitionerRole,
        organization,
      })

      return res.status(200).json({ success: true, data: data })
    } catch (errorInfo) {
      return res.status(500).json({ success: false })
    }
  } else if ([CONFIG.ROLE_TYPE.PATIENT].includes(permission.role)) {
    try {
      const bundleResponse = await fhirService.getResource('Patient', {
        _id: patientId,
      })

      const bundle = bundleResponse.data

      const resourceArray = fhirService.loadResourceArray(
        bundle.entry.map(bundleEntry => bundleEntry.resource)
      )

      const patient = resourceArray.find(
        resource =>
          resource.resourceType === 'Patient' && resource.id === patientId
      )

      Object.assign(data, {
        patient,
      })

      return res.status(200).json({ success: true, data: data })
    } catch (errorInfo) {
      return res.status(500).json({ success: false })
    }
  }
  return res.status(400).json({ success: false })
})

router.get('/user/getUserInfo', async (req, res) => {
  const user = await UserModel.find({
    username: req.query.userId,
  })

  if (
    [
      CONFIG.ROLE_TYPE.RECEPTIONIST,
      CONFIG.ROLE_TYPE.PHLEBOTOMIST,
      CONFIG.ROLE_TYPE.LABORATORY_TECHNICIAN,
      CONFIG.ROLE_TYPE.EXTERNAL_RECEPTIONIST,
      CONFIG.ROLE_TYPE.SENIOR_LABORATORY_TECHNICIAN,
      CONFIG.ROLE_TYPE.PRACTITIONER,
    ].includes(user.permission.role)
  ) {
    const bundleResponse = await fhirService.getResource('Practitioner', {
      _id: user.practitionerId,
      _revinclude: ['PractitionerRole:practitioner'],
      '_include:iterate': ['PractitionerRole:organization'],
    })

    const bundle = bundleResponse.data

    const resourceArray = fhirService.loadResourceArray(
      bundle.entry.map(bundleEntry => bundleEntry.resource)
    )

    // PractitionerRole has only one practitioner and one organzation reference
    const practitioner = resourceArray.find(
      resource =>
        resource.resourceType === 'Practitioner' &&
        resource.id === practitionerId
    )
    const practitionerRole = resourceArray.find(
      resource => resource.resourceType === 'PractitionerRole'
    )
    const organization = resourceArray.find(
      resource => resource.resourceType === 'Organization'
    )

    return res.status(200).json({
      success: true,
      data: {
        practitioner,
        practitionerRole,
        organization,
      },
    })
  } else if ([CONFIG.ROLE_TYPE.PATIENT].includes(user.permission.role)) {
    const bundleResponse = await fhirService.getResource('Patient', {
      _id: user.patientId,
    })

    const bundle = bundleResponse.data

    const resourceArray = fhirService.loadResourceArray(
      bundle.entry.map(bundleEntry => bundleEntry.resource)
    )

    const patient = resourceArray.find(
      resource =>
        resource.resourceType === 'Patient' && resource.id === patientId
    )

    Object.assign(data, {
      patient,
    })

    return res.status(200).json({ success: true, data: data })
  }
  return res.status(400).json({ success: false })
})

const NOTFOUND = {
  message: 'NotFound',
  documentation_url: 'http://localhost:8000/request',
}

router.get('/user/:id', async (req, res) => {
  const userDocument = await UserModel.findOne({
    _id: req.params.id,
  })
  const user = userDocument.toObject()

  if (
    [
      CONFIG.ROLE_TYPE.RECEPTIONIST,
      CONFIG.ROLE_TYPE.PHLEBOTOMIST,
      CONFIG.ROLE_TYPE.LABORATORY_TECHNICIAN,
      CONFIG.ROLE_TYPE.EXTERNAL_RECEPTIONIST,
      CONFIG.ROLE_TYPE.SENIOR_LABORATORY_TECHNICIAN,
      CONFIG.ROLE_TYPE.PRACTITIONER,
    ].includes(user.permission.role)
  ) {
    const bundleResponse = await fhirService.getResource('Practitioner', {
      _id: user.practitionerId,
      _revinclude: ['PractitionerRole:practitioner'],
      '_include:iterate': ['PractitionerRole:organization'],
    })

    const bundle = bundleResponse.data

    const resourceArray = fhirService.loadResourceArray(
      bundle.entry.map(bundleEntry => bundleEntry.resource)
    )

    // PractitionerRole has only one practitioner and one organzation reference
    const practitioner = resourceArray.find(
      resource =>
        resource.resourceType === 'Practitioner' &&
        resource.id === user.practitionerId
    )
    const practitionerRole = resourceArray.find(
      resource => resource.resourceType === 'PractitionerRole'
    )
    const organization = resourceArray.find(
      resource => resource.resourceType === 'Organization'
    )

    return res.status(200).json({
      success: true,
      data: {
        user: user,
        practitioner,
        practitionerRole,
        organization,
      },
    })
  } else if ([CONFIG.ROLE_TYPE.PATIENT].includes(user.permission.role)) {
    const bundleResponse = await fhirService.getResource('Patient', {
      _id: user.patientId,
    })

    const bundle = bundleResponse.data

    const resourceArray = fhirService.loadResourceArray(
      bundle.entry.map(bundleEntry => bundleEntry.resource)
    )

    const patient = resourceArray.find(
      resource =>
        resource.resourceType === 'Patient' && resource.id === user.patientId
    )

    return res.status(200).json({
      success: true,
      data: {
        user: user,
        patient,
      },
    })
  }
  return res.status(400).json({ success: false })
})

router.post('/user', async (req, res) => {
  const organizationResponse = await fhirService.getResourceById(
    'Organization',
    req.body.organizationId
  )

  const organization = new Organization(organizationResponse.data)

  let practitionerResponse
  let practitionerRoleResponse

  try {
    if (
      !organization.address ||
      !organization.address[0] ||
      !organization.address[0].state
    ) {
      throw new Error(
        'Эмнэлгийн хаяг бүртгэлгүй байна. Та эхлээд эмнэлэг цэснээс эмнэлгийн мэдээллийг оруулна уу.'
      )
    }

    const existingUser = await UserModel.findOne({
      email: req.body.email,
    })

    if (existingUser) {
      throw new Error('User exists with the email')
    }

    if (
      [
        req.body.firstName,
        req.body.lastName,
        req.body.nationalIdentificationNumber,
        req.body.email,
        req.body.role,
      ].includes(undefined)
    ) {
      throw new Error('Missing argument')
    }

    const userData = {
      permission: {
        access: {
          read: true,
          write: true,
        },
        role: req.body.role,
        scope: [req.body.role],
      },
      username: req.body.email,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      nationalIdentificationNumber: req.body.nationalIdentificationNumber,
    }

    if (
      [
        CONFIG.ROLE_TYPE.RECEPTIONIST,
        CONFIG.ROLE_TYPE.PHLEBOTOMIST,
        CONFIG.ROLE_TYPE.LABORATORY_TECHNICIAN,
        CONFIG.ROLE_TYPE.EXTERNAL_RECEPTIONIST,
        CONFIG.ROLE_TYPE.SENIOR_LABORATORY_TECHNICIAN,
        CONFIG.ROLE_TYPE.PRACTITIONER,
      ].includes(req.body.role)
    ) {
      const PractitionerObject = {
        name: [
          {
            extension: [
              {
                url:
                  'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
                valueString: req.body.lastName[0],
              },
            ],
            use: 'official',
            family: req.body.lastName,
            given: [req.body.firstName],
          },
        ],
        identifier: [
          {
            ...Identifiers.NationalIdentificationNumber,
            value: req.body.nationalIdentificationNumber,
          },
        ],
        telecom: [
          {
            system: 'email',
            value: req.body.email,
          },
        ],
      }

      if (req.body.mobile) {
        PractitionerObject.telecom.push({
          system: 'phone',
          value: req.body.mobile,
          use: 'mobile',
        })
      }

      const practitioner = new Practitioner(PractitionerObject)

      practitionerResponse = await fhirService.postResource(
        practitioner.resourceType,
        practitioner.toJSON()
      )

      const practitionerResource = new Practitioner(practitionerResponse.data)
      const practitionerRole = new PractitionerRole({
        practitioner: practitionerResource.getReference(),
        organization: organization.getReference(),
      })

      practitionerRoleResponse = await fhirService.postResource(
        practitionerRole.resourceType,
        practitionerRole.toJSON()
      )

      Object.assign(userData, {
        practitionerId: practitionerResponse.data.id,
      })

      const userInstance = new UserModel(userData)
      await userInstance.save()

      return res.status(200).json({
        success: true,
        message: 'User successfully updated',
      })
    } else if ([CONFIG.ROLE_TYPE.PATIENT].includes(req.body.role)) {
      // Өвчтөн нэмэхийг өөр хэсгээс нэмнэ
    }

    return res.status(400).json({
      success: false,
      message: 'Failed',
    })
  } catch (errorInfo) {
    console.error(errorInfo)

    if (practitionerResponse && practitionerResponse.data) {
      await fhirService.deleteResource(
        practitionerResponse.data.resourceType,
        practitionerResponse.data.id
      )
    }

    if (practitionerRoleResponse && practitionerRoleResponse.data) {
      await fhirService.deleteResource(
        practitionerRoleResponse.data.resourceType,
        practitionerRoleResponse.data.id
      )
    }

    return res.status(200).json({
      success: false,
      message: errorInfo.message,
    })
  }
})

router.delete('/user/:id', (req, res) => {
  UserModel.remove({ _id: req.params.id }, err => {
    if (err) res.status(404).json(NOTFOUND)
    else res.status(204).end()
  })
})

router.patch('/userPass/:id', (req, res) => {
  const _data = req.body.params
  UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      pass: _data.newpass1,
    },
    function(err, u) {
      if (err) res.status(400).json({ message: err, success: false })
      else
        res.status(201).json({
          message: 'Амжилттай засварлалаа.',
          success: true,
        })
    }
  )

  // res.status(400).json({ message: 'err', success: false })
  // res.status(201).json({ message: 'Амжилттай засварлалаа.', success: true })
})

router.patch('/user/:id', (req, res) => {
  const payload = req.body
  perm = {
    role: 'suh',
    visit: ['1', '8', '81', '811', '9'],
  }

  var token = req.signedCookies['x-access-token']
  if (token === 'undefined') {
    return res
      .status(200)
      .send({ success: false, message: 'Not autherticated' })
  }

  return jwt.verify(token, CONFIG.secret, (err, decoded) => {
    if (err) {
      return res
        .status(200)
        .send({ success: false, message: 'Not autherticated' })
    }
    const userId = decoded.sub

    if (!validateEmail(payload.email)) {
      return res.status(200).send({
        success: false,
        message: 'E-mail address is invalid!',
      })
    }

    const data = {
      // permission: perm,
      // usertype: payload.usertype,
      // position: payload.position,
      username: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      mobile: payload.mobile,
      profession: payload.profession,
    }

    if (payload.password) {
      data.password = payload.password
    }

    UserModel.findOneAndUpdate({ _id: userId }, data, function(err, u) {
      if (err) res.status(400).json({ message: err, success: false })
      else
        res.status(201).json({
          message: 'Successfully Updated',
          success: true,
        })
    })
  })
})

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

module.exports = router
