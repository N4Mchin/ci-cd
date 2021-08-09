const dictionaryEN = require('./locale/en')
const dictionaryMN = require('./locale/mn')

module.exports = function translate(key, language) {
  if (language === 'mn' && dictionaryMN[key] !== undefined) {
    return dictionaryMN[key]
  }

  // default en
  if (dictionaryEN[key] !== undefined) {
    return dictionaryEN[key]
  } else {
    return key
  }
}
