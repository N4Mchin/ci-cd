const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const config = require('../config')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  const _origin = req.headers.origin
  const _method = req.method
  var _referer = req.headers.referer

  if (!_referer) {
    return res.status(404).send()
  }

  _referer = _referer.replace(_origin + '/', '')

  var arrUrl = _referer.split('/')
  if (arrUrl.length > 0) _referer = arrUrl[0]

  var token = req.signedCookies['x-access-token']
  if (token === undefined) {
    return res.status(200).send({ success: false, message: 'Not signed in' })
  }

  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(200).send({ success: false, message: 'Not signed in' })
    }
    const userId = decoded.sub

    return User.findById(userId, (error, doc) => {
      if (error || !doc) {
        return res
          .status(200)
          .send({ success: false, message: 'Not signed in' })
      } else {
        const user = doc.toJSON()

        let permission = user.permission.role

        // exclude password
        const userData = {
          _id: user._id,
          name: user.username,
          email: user.email,
          userid: user.username,
          permission: user.permission,
          utype: permission,
          lastName: user.lastName,
          firstName: user.firstName,
          practitionerId: user.practitionerId,
          patientId: user.patientId,
          nameDisplay: user.nameDisplay,
          roleDisplay: user.roleDisplay,
        }

        req.user = userData

        next()
      }
    })
  })
}
