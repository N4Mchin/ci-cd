/**
 * @name exports
 * @summary Patient Class
 */
module.exports = class Patient {
  constructor(opts) {
    // Create an object to store all props
    Object.defineProperty(this, '__data', { value: {} })

    // Define getters and setters as enumerable

    Object.defineProperty(this, '_id', {
      enumerable: true,
      get: () => this.__data._id,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._id = new Element(value)
      },
    })

    Object.defineProperty(this, 'id', {
      enumerable: true,
      get: () => this.__data.id,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.id = value
      },
    })

    Object.defineProperty(this, 'meta', {
      enumerable: true,
      get: () => this.__data.meta,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Meta = require('./meta.js')
        this.__data.meta = new Meta(value)
      },
    })

    Object.defineProperty(this, '_implicitRules', {
      enumerable: true,
      get: () => this.__data._implicitRules,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._implicitRules = new Element(value)
      },
    })

    Object.defineProperty(this, 'implicitRules', {
      enumerable: true,
      get: () => this.__data.implicitRules,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.implicitRules = value
      },
    })

    Object.defineProperty(this, '_language', {
      enumerable: true,
      get: () => this.__data._language,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._language = new Element(value)
      },
    })

    Object.defineProperty(this, 'language', {
      enumerable: true,
      get: () => this.__data.language,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.language = value
      },
    })

    Object.defineProperty(this, 'text', {
      enumerable: true,
      get: () => this.__data.text,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Narrative = require('./narrative.js')
        this.__data.text = new Narrative(value)
      },
    })

    Object.defineProperty(this, 'contained', {
      enumerable: true,
      get: () => this.__data.contained,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.contained = Array.isArray(value)
          ? value.map(v => v)
          : [value]
      },
    })

    Object.defineProperty(this, 'extension', {
      enumerable: true,
      get: () => this.__data.extension,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Extension = require('./extension.js')
        this.__data.extension = Array.isArray(value)
          ? value.map(v => new Extension(v))
          : [new Extension(value)]
      },
    })

    Object.defineProperty(this, 'modifierExtension', {
      enumerable: true,
      get: () => this.__data.modifierExtension,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Extension = require('./extension.js')
        this.__data.modifierExtension = Array.isArray(value)
          ? value.map(v => new Extension(v))
          : [new Extension(value)]
      },
    })

    Object.defineProperty(this, 'identifier', {
      enumerable: true,
      get: () => this.__data.identifier,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Identifier = require('./identifier.js')
        this.__data.identifier = Array.isArray(value)
          ? value.map(v => new Identifier(v))
          : [new Identifier(value)]
      },
    })

    Object.defineProperty(this, '_active', {
      enumerable: true,
      get: () => this.__data._active,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._active = new Element(value)
      },
    })

    Object.defineProperty(this, 'active', {
      enumerable: true,
      get: () => this.__data.active,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.active = value
      },
    })

    Object.defineProperty(this, 'name', {
      enumerable: true,
      get: () => this.__data.name,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let HumanName = require('./humanname.js')
        this.__data.name = Array.isArray(value)
          ? value.map(v => new HumanName(v))
          : [new HumanName(value)]
      },
    })

    Object.defineProperty(this, 'telecom', {
      enumerable: true,
      get: () => this.__data.telecom,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let ContactPoint = require('./contactpoint.js')
        this.__data.telecom = Array.isArray(value)
          ? value.map(v => new ContactPoint(v))
          : [new ContactPoint(value)]
      },
    })

    Object.defineProperty(this, '_gender', {
      enumerable: true,
      get: () => this.__data._gender,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._gender = new Element(value)
      },
    })

    Object.defineProperty(this, 'gender', {
      enumerable: true,
      get: () => this.__data.gender,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.gender = value
      },
    })

    Object.defineProperty(this, '_birthDate', {
      enumerable: true,
      get: () => this.__data._birthDate,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._birthDate = new Element(value)
      },
    })

    Object.defineProperty(this, 'birthDate', {
      enumerable: true,
      get: () => this.__data.birthDate,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.birthDate = value
      },
    })

    Object.defineProperty(this, '_deceasedBoolean', {
      enumerable: true,
      get: () => this.__data._deceasedBoolean,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._deceasedBoolean = new Element(value)
      },
    })

    Object.defineProperty(this, 'deceasedBoolean', {
      enumerable: true,
      get: () => this.__data.deceasedBoolean,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.deceasedBoolean = value
      },
    })

    Object.defineProperty(this, '_deceasedDateTime', {
      enumerable: true,
      get: () => this.__data._deceasedDateTime,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._deceasedDateTime = new Element(value)
      },
    })

    Object.defineProperty(this, 'deceasedDateTime', {
      enumerable: true,
      get: () => this.__data.deceasedDateTime,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.deceasedDateTime = value
      },
    })

    Object.defineProperty(this, 'address', {
      enumerable: true,
      get: () => this.__data.address,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Address = require('./address.js')
        this.__data.address = Array.isArray(value)
          ? value.map(v => new Address(v))
          : [new Address(value)]
      },
    })

    Object.defineProperty(this, 'maritalStatus', {
      enumerable: true,
      get: () => this.__data.maritalStatus,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let CodeableConcept = require('./codeableconcept.js')
        this.__data.maritalStatus = new CodeableConcept(value)
      },
    })

    Object.defineProperty(this, '_multipleBirthBoolean', {
      enumerable: true,
      get: () => this.__data._multipleBirthBoolean,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._multipleBirthBoolean = new Element(value)
      },
    })

    Object.defineProperty(this, 'multipleBirthBoolean', {
      enumerable: true,
      get: () => this.__data.multipleBirthBoolean,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.multipleBirthBoolean = value
      },
    })

    Object.defineProperty(this, '_multipleBirthInteger', {
      enumerable: true,
      get: () => this.__data._multipleBirthInteger,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._multipleBirthInteger = new Element(value)
      },
    })

    Object.defineProperty(this, 'multipleBirthInteger', {
      enumerable: true,
      get: () => this.__data.multipleBirthInteger,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.multipleBirthInteger = value
      },
    })

    Object.defineProperty(this, 'photo', {
      enumerable: true,
      get: () => this.__data.photo,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Attachment = require('./attachment.js')
        this.__data.photo = Array.isArray(value)
          ? value.map(v => new Attachment(v))
          : [new Attachment(value)]
      },
    })

    Object.defineProperty(this, 'contact', {
      enumerable: true,
      get: () => this.__data.contact,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let PatientContact = require('./patientcontact.js')
        this.__data.contact = Array.isArray(value)
          ? value.map(v => new PatientContact(v))
          : [new PatientContact(value)]
      },
    })

    Object.defineProperty(this, 'communication', {
      enumerable: true,
      get: () => this.__data.communication,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let PatientCommunication = require('./patientcommunication.js')
        this.__data.communication = Array.isArray(value)
          ? value.map(v => new PatientCommunication(v))
          : [new PatientCommunication(value)]
      },
    })

    Object.defineProperty(this, 'generalPractitioner', {
      enumerable: true,
      get: () => this.__data.generalPractitioner,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Reference = require('./reference.js')
        this.__data.generalPractitioner = Array.isArray(value)
          ? value.map(v => new Reference(v))
          : [new Reference(value)]
      },
    })

    Object.defineProperty(this, 'managingOrganization', {
      enumerable: true,
      get: () => this.__data.managingOrganization,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Reference = require('./reference.js')
        this.__data.managingOrganization = new Reference(value)
      },
    })

    Object.defineProperty(this, 'link', {
      enumerable: true,
      get: () => this.__data.link,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let PatientLink = require('./patientlink.js')
        this.__data.link = Array.isArray(value)
          ? value.map(v => new PatientLink(v))
          : [new PatientLink(value)]
      },
    })

    // Merge in any defaults
    Object.assign(this, opts)

    // Define a default non-writable resourceType property
    Object.defineProperty(this, 'resourceType', {
      value: 'Patient',
      enumerable: true,
      writable: false,
    })
  }

  static get resourceType() {
    return 'Patient'
  }

  getOfficialName() {
    try {
      return this.name.find(n => n.use === 'official')
    } catch {
      return
    }
  }

  getFirstName(prefer = 'mn') {
    if (prefer === 'mn') {
      try {
        const officialName = this.getOfficialName()
        const firstName = officialName.given[0]
        return firstName
      } catch {}
    }

    return (
      this.name &&
      this.name.find(n => n.given !== undefined && n.given.length > 0).given[0]
    )
  }

  getFamiltyInitials() {
    try {
      const officialName = this.getOfficialName()
      return officialName.family
    } catch {}

    try {
      const officialName = this.getOfficialName()
      const familyInitials = officialName.extension.find(
        e =>
          e.url ===
          'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension'
      )

      return familyInitials.valueString
    } catch {}
  }

  getLastName() {
    try {
      const officialName = this.getOfficialName()

      return officialName.family
    } catch {}
  }

  // the `= {}` below lets you call the function without any parameters
  getOfficialNameString({ short = false, format = 'mn' } = {}) {
    const firstName = this.getFirstName(format)
    const lastName = this.getLastName(format)

    if (format === 'mn') {
      if (short) {
        return `${lastName.charAt(0)}. ${firstName}`
      } else {
        return `${lastName} ${firstName}`
      }
    } else {
      if (short) {
        return `${firstName.charAt(0)}. ${lastName}`
      } else {
        return `${firstName} ${lastName}`
      }
    }
  }

  getMobilePhones() {
    try {
      const utils = require('../utils/helper.js')
      const phones = this.telecom.filter(
        contactPoint => contactPoint.system === 'phone'
      )

      const sortedByRank = utils.orderBy(phones, 'rank', 'asc')

      const phoneNumbers = sortedByRank.map(phone => phone.value)

      return phoneNumbers
    } catch {
      return
    }
  }

  getEmails() {
    try {
      const utils = require('../utils/helper.js')
      const emails = this.telecom.filter(
        contactPoint => contactPoint.system === 'email'
      )
      const sortedByRank = utils.orderBy(emails, 'rank', 'asc')
      const emailAddresses = sortedByRank.map(email => email.value)
      return emailAddresses
    } catch {
      return
    }
  }

  getReference() {
    return {
      reference: `${this.resourceType}/${this.id}`,
      type: this.resourceType,
      identifier: this.identifier.find(
        v =>
          v.system ===
          'http://fhir.mn/identifiers/national-identification-number'
      ),
      display: this.getOfficialNameString(),
    }
  }

  getNationalIdentificationNumber(prefer = 'mn') {
    try {
      const nim = this.identifier.find(
        v =>
          v.system ===
          'http://fhir.mn/identifiers/person/national-identification-number'
      ).value

      return nim
    } catch {}
    return
  }

  // NOTE: _function is a specific purpose function for livercenter

  _getBarcode(use = 'usual') {
    try {
      const barcode = this.identifier.find(
        v =>
          v.system === 'http://livercenter.mn/fhir/identifiers/patient' &&
          v.use === use
      ).value
      return barcode
    } catch {}
    return
  }

  _getGeneralPractitioner() {
    return
  }

  _getForeignerIdentifier() {
    const foreignerIdentifier =
      this.identifier &&
      this.identifier.find(
        v =>
          v.system ===
          'http://livercenter.mn/fhir/identifiers/national-person-identifier-of-foreigners'
      )

    if (foreignerIdentifier && foreignerIdentifier.value)
      return foreignerIdentifier.value

    return
  }

  _setFamilyInitials(familyName) {
    if (!familyName || familyName === '') return
    let Extension = require('./extension.js')
    const familyInitials = new Extension({
      url:
        'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
      valueString: familyName.charAt(0),
    })

    const officialNameIndex =
      this.name && this.name.findIndex(v => v.use === 'official')

    if (Number.isInteger(officialNameIndex) && officialNameIndex >= 0) {
      const familyInitialsIndex =
        this.name[officialNameIndex].extension &&
        this.name[officialNameIndex].extension.findIndex(
          v =>
            v.url ===
            'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension'
        )

      if (
        Number.isInteger(familyInitialsIndex, familyInitialsIndex) &&
        familyInitialsIndex >= 0
      ) {
        this.name[officialNameIndex].extension[
          familyInitialsIndex
        ] = familyInitials
      } else {
        if (this.name[officialNameIndex].extension) {
          this.name[officialNameIndex].extension.push(familyInitials)
        } else {
          this.name[officialNameIndex].extension = [familyInitials]
        }
      }
    } else {
      this.name = {
        use: 'official',
        extension: [familyInitials],
      }
    }
  }

  _setFamilyName(familyNameString) {
    if (!familyNameString || familyNameString === '') return

    const officialNameIndex =
      this.name && this.name.findIndex(v => v.use === 'official')

    if (Number.isInteger(officialNameIndex) && officialNameIndex >= 0) {
      this.name[officialNameIndex].family = familyNameString
      this._setFamilyInitials(familyNameString)
    } else {
      let HumanName = require('./humanname.js')
      this.name = new HumanName({
        use: 'official',
        family: familyNameString,
      })

      this._setFamilyInitials(familyNameString)
    }
  }

  _setGivenName(givenNameString) {
    if (!givenNameString || givenNameString === '') return

    const officialNameIndex =
      this.name && this.name.findIndex(v => v.use === 'official')

    if (Number.isInteger(officialNameIndex) && officialNameIndex >= 0) {
      Object.assign(this.name[officialNameIndex], { given: [givenNameString] })
    } else {
      let HumanName = require('./humanname.js')
      this.name = new HumanName({
        use: 'official',
        given: [givenNameString],
      })
    }
  }

  _setClanName(clanNameString) {
    if (!clanNameString || clanNameString === '') return

    const officialNameIndex =
      this.name && this.name.findIndex(v => v.use === 'official')

    if (Number.isInteger(officialNameIndex) && officialNameIndex >= 0) {
      const clanNameIndex =
        this.name[officialNameIndex].extension &&
        this.name[officialNameIndex].extension.findIndex(
          v =>
            v.url ===
            'http://fhir.mn/StructureDefinition/mng-human-name-clan-name-extension'
        )
      if (Number.isInteger(clanNameIndex) && clanNameIndex >= 0) {
        const clanName = this.name[officialNameIndex].extension[clanNameIndex]
        Object.assign(clanName, {
          valueString: clanNameString,
        })

        this.name[officialNameIndex].extension[clanNameIndex] = clanName
      } else {
        let Extension = require('./extension.js')
        const clanName = new Extension({
          url:
            'http://fhir.mn/StructureDefinition/mng-human-name-clan-name-extension',
          valueString: clanNameString,
        })

        this.name[officialNameIndex].extension = this.pushToArray(
          this.name[officialNameIndex].extension,
          clanName
        )
      }
    } else {
      let HumanName = require('./humanname.js')
      this.name = new HumanName({
        use: 'official',
        extension: {
          url:
            'http://fhir.mn/StructureDefinition/mng-human-name-clan-name-extension',
          valueString: clanNameString,
        },
      })
    }
  }

  _addMobilePhone(mobilePhoneString, rank) {
    if (mobilePhoneString === '') {
      return
    }

    if (!!rank && isNaN(parseInt(rank))) {
      return
    }

    let ContactPoint = require('./contactpoint.js')
    const mobilePhone = new ContactPoint({
      system: 'phone',
      value: mobilePhoneString,
      use: 'mobile',
      rank: rank && rank,
    })

    this.telecom = this.pushToArray(this.telecom, mobilePhone)
  }

  _addEmail(emailString, rank) {
    if (emailString === '') {
      return
    }

    if (!!rank && isNaN(parseInt(rank))) {
      return
    }

    let ContactPoint = require('./contactpoint.js')
    const mobilePhone = new ContactPoint({
      system: 'email',
      value: emailString,
      rank: rank && rank,
    })

    this.telecom = this.pushToArray(this.telecom, mobilePhone)
  }

  _setNationalIdentificationNumber(nationalIdentificationNumberString) {
    if (nationalIdentificationNumberString === '') {
      return
    }

    const ninIndex =
      this.identifier &&
      this.identifier.findIndex(
        v =>
          v.system ===
          'http://fhir.mn/identifiers/national-identification-number'
      )

    let Identifier = require('./identifier.js')
    const nationalIdentificationNumber = new Identifier({
      use: 'official',
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'NNmng',
          },
        ],
      },
      system: 'http://fhir.mn/identifiers/national-identification-number',
      value: nationalIdentificationNumberString,
    })

    if (ninIndex && ninIndex >= 0) {
      this.identifier[ninIndex] = nationalIdentificationNumber
    } else {
      this.identifier = this.pushToArray(
        this.identifier,
        nationalIdentificationNumber
      )
    }
  }

  _setForeignerIdentifier(foreignerIdentifierString) {
    if (foreignerIdentifierString === '') {
      return
    }
    const foreignerIdentifierSystem =
      'http://livercenter.mn/fhir/identifiers/national-person-identifier-of-foreigners'

    const foreignerIdentifierIndex =
      this.identifier &&
      this.identifier.findIndex(v => v.system === foreignerIdentifierSystem)

    let Identifier = require('./identifier.js')
    const foreignerIdentifier = new Identifier({
      use: 'official',
      type: { text: 'National Person Identifier of Foreigners' },
      system: foreignerIdentifierSystem,
      value: foreignerIdentifierString,
    })
    if (foreignerIdentifierIndex && foreignerIdentifierIndex >= 0) {
      this.identifier[foreignerIdentifierIndex] = foreignerIdentifier
    } else {
      this.identifier = this.pushToArray(this.identifier, foreignerIdentifier)
    }
  }

  _getClanName() {
    const officialName = this.getOfficialName()

    if (!!officialName) {
      const clanNameExtension =
        officialName.extension &&
        officialName.extension.find(
          v =>
            v.url ===
            'http://fhir.mn/StructureDefinition/mng-human-name-clan-name-extension'
        )
      if (clanNameExtension && clanNameExtension.valueString)
        return clanNameExtension.valueString
    }
    return
  }

  toJSON() {
    return {
      resourceType: this.resourceType,
      id: this.id,
      meta: this.meta && this.meta.toJSON(),
      _implicitRules: this._implicitRules && this._implicitRules.toJSON(),
      implicitRules: this.implicitRules,
      _language: this._language && this._language.toJSON(),
      language: this.language,
      text: this.text && this.text.toJSON(),
      contained: this.contained,
      extension: this.extension && this.extension.map(v => v.toJSON()),
      modifierExtension:
        this.modifierExtension && this.modifierExtension.map(v => v.toJSON()),
      identifier: this.identifier && this.identifier.map(v => v.toJSON()),
      _active: this._active && this._active.toJSON(),
      active: this.active,
      name: this.name && this.name.map(v => v.toJSON()),
      telecom: this.telecom && this.telecom.map(v => v.toJSON()),
      _gender: this._gender && this._gender.toJSON(),
      gender: this.gender,
      _birthDate: this._birthDate && this._birthDate.toJSON(),
      birthDate: this.birthDate,
      _deceasedBoolean: this._deceasedBoolean && this._deceasedBoolean.toJSON(),
      deceasedBoolean: this.deceasedBoolean,
      _deceasedDateTime:
        this._deceasedDateTime && this._deceasedDateTime.toJSON(),
      deceasedDateTime: this.deceasedDateTime,
      address: this.address && this.address.map(v => v.toJSON()),
      maritalStatus: this.maritalStatus && this.maritalStatus.toJSON(),
      _multipleBirthBoolean:
        this._multipleBirthBoolean && this._multipleBirthBoolean.toJSON(),
      multipleBirthBoolean: this.multipleBirthBoolean,
      _multipleBirthInteger:
        this._multipleBirthInteger && this._multipleBirthInteger.toJSON(),
      multipleBirthInteger: this.multipleBirthInteger,
      photo: this.photo && this.photo.map(v => v.toJSON()),
      contact: this.contact && this.contact.map(v => v.toJSON()),
      communication:
        this.communication && this.communication.map(v => v.toJSON()),
      generalPractitioner:
        this.generalPractitioner &&
        this.generalPractitioner.map(v => v.toJSON()),
      managingOrganization:
        this.managingOrganization && this.managingOrganization.toJSON(),
      link: this.link && this.link.map(v => v.toJSON()),
    }
  }

  pushToArray(array, element) {
    if (Array.isArray(array)) {
      array.push(element)
    } else {
      array = [element]
    }

    return array
  }
}
