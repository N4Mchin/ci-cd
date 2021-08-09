/**
 * @name exports
 * @summary EffectEvidenceSynthesisSampleSize Class
 */
module.exports = class EffectEvidenceSynthesisSampleSize {
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

    Object.defineProperty(this, '_description', {
      enumerable: true,
      get: () => this.__data._description,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._description = new Element(value)
      },
    })

    Object.defineProperty(this, 'description', {
      enumerable: true,
      get: () => this.__data.description,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.description = value
      },
    })

    Object.defineProperty(this, '_numberOfStudies', {
      enumerable: true,
      get: () => this.__data._numberOfStudies,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._numberOfStudies = new Element(value)
      },
    })

    Object.defineProperty(this, 'numberOfStudies', {
      enumerable: true,
      get: () => this.__data.numberOfStudies,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.numberOfStudies = value
      },
    })

    Object.defineProperty(this, '_numberOfParticipants', {
      enumerable: true,
      get: () => this.__data._numberOfParticipants,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        let Element = require('./element.js')
        this.__data._numberOfParticipants = new Element(value)
      },
    })

    Object.defineProperty(this, 'numberOfParticipants', {
      enumerable: true,
      get: () => this.__data.numberOfParticipants,
      set: value => {
        if (value === undefined || value === null) {
          return
        }

        this.__data.numberOfParticipants = value
      },
    })

    // Merge in any defaults
    Object.assign(this, opts)

    // Define a default non-writable resourceType property
    Object.defineProperty(this, 'resourceType', {
      value: 'EffectEvidenceSynthesisSampleSize',
      enumerable: true,
      writable: false,
    })
  }

  static get resourceType() {
    return 'EffectEvidenceSynthesisSampleSize'
  }

  toJSON() {
    return {
      id: this.id,
      extension: this.extension && this.extension.map(v => v.toJSON()),
      modifierExtension:
        this.modifierExtension && this.modifierExtension.map(v => v.toJSON()),
      _description: this._description && this._description.toJSON(),
      description: this.description,
      _numberOfStudies: this._numberOfStudies && this._numberOfStudies.toJSON(),
      numberOfStudies: this.numberOfStudies,
      _numberOfParticipants:
        this._numberOfParticipants && this._numberOfParticipants.toJSON(),
      numberOfParticipants: this.numberOfParticipants,
    }
  }
}
