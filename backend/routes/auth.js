const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('@config')
const User = require('../models/user')
const helper = require('@helper')
const PasswordRecovery = require('../models/passwordrecovery')
const uuidv4 = require('uuid/v4')
const sendEmail = require('./sendEmail')

const router = new express.Router()

router.post('/user/login', async function(req, res, next) {
  const { username, password, rememberMe } = req.body

  try {
    const user = await User.findOne({ username: username })

    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'User does not exist',
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: 'Username or password is invalid',
      })
    }

    const payload = {
      sub: user._id,
    }

    const expiry = rememberMe
      ? 1000 * 60 * 60 * 24 * 7 // 24 hours * 7
      : 1000 * 60 * 60 * 24 // 24 hours

    const token = jwt.sign(payload, config.secret, {
      expiresIn: expiry,
    })

    const data = user.toJSON()
    delete data.password

    const options = {
      maxAge: expiry,
      httpOnly: true,
      signed: true,
      // sameSite: true
    }

    res.cookie('x-access-token', token, options)

    return res.json({
      success: true,
      message: 'Log in successful',
      user: data,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

router.post('/user/logout', function(req, res, next) {
  res.clearCookie('x-access-token')
  return res.status(200).send()
})

router.post('/user/querypasswordrecoverylink', function(req, res, next) {
  const link = req.body.id
  PasswordRecovery.findOne(
    { link: link }, // conditions
    function(err, doc) {
      //callback
      if (err) {
        return res.sendStatus(500)
      } else if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Invalid link',
        })
      } else {
        return res.status(200).json({
          success: true,
          message: 'Valid link',
        })
      }
    }
  )
})

router.post('/user/changepassword', function(req, res, next) {
  console.log(req.params.id, req.body)

  const { id, password, confirm } = req.body

  if (password !== confirm) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    })
  }

  var query = PasswordRecovery.findOne({ link: id }).exec()
  query
    .then(function(doc) {
      //  console.log('err, doc: ', doc)

      if (!doc) {
        throw 'link invalid'
      } else {
        console.log('email', doc.email)
        return doc.email
      }
    })
    .then(function(email) {
      return User.findOne({ email: email }).exec()
    })
    .then(function(user) {
      return comparePasswords(user, password)
    })
    .then(function(user) {
      return User.findOneAndUpdate(
        { email: user.email },
        { password: password }
      ).exec()
    })
    .then(function(user) {
      // console.log('last: ', user)
      if (!user) {
        throw 'No user found by email'
      } else {
        return
      }
    })
    .then(function() {
      return PasswordRecovery.deleteOne({ link: id })
      // .remove()
      //.exec()
    })
    .then(function() {
      return res.status(200).json({
        success: true,
        message: 'Password changed',
      })
    })
    .catch(function(exception) {
      console.log(exception)
      return res.status(400).json({
        success: false,
        message: exception,
      })
    })
})

router.post('/user/sendemail', function(req, res, next) {
  console.log('send email to', req.body)
  const email = req.body.email

  if (!validateEmail(email)) {
    return res
      .status(200)
      .json({ success: false, message: 'E-mail address is invalid!' })
  }

  userExists(email)
    .then(function() {
      return generateLink()
    })
    .then(function(link) {
      return saveLink(link, email)
    })
    .then(function(result) {
      sendEmail.sendPasswordRecoveryLink(result)
      return res.status(200).json({ success: true, message: 'email sent' })
    })
    .catch(function(exception) {
      return res
        .status(500)
        .json({ success: false, message: "Couldn't send an email" })
    })
})

router.post('/user/validatepassword', function(req, res, next) {
  const { password } = req.body

  var token = req.signedCookies['x-access-token']
  if (token === 'undefined') {
    return res
      .status(200)
      .send({ success: false, message: 'Not autherticated' })
  }

  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(200)
        .send({ success: false, message: 'Not autherticated' })
    }
    const userId = decoded.sub

    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        // console.log('Not autherticated');
        return res
          .status(200)
          .send({ success: false, message: 'Not autherticated' })
      } else {
        validatePassword(user, password)
          .then(result => {
            return res
              .status(200)
              .send({ success: true, message: 'Password is valid' })
          })
          .catch(err => {
            return res
              .status(200)
              .send({ success: false, message: 'Password is invalid' })
          })
      }
    })
  })
})

function validatePassword(user, password) {
  return new Promise(function(resolve, reject) {
    user.comparePassword(password, function(passwordErr, isMatch) {
      if (isMatch) {
        resolve('Password is valid')
      } else {
        reject('Password is invalid')
      }
    })
  })
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function comparePasswords(user, password) {
  return user.comparePassword(password).then(isMatch => {
    if (isMatch) {
      throw new Error('Нууц үг хуучин нууц үгээс ялгаатай байх ёстой.')
    }

    return user
  })
}

function userExists(email) {
  return new Promise(function(resolve, reject) {
    if (email === undefined) {
      reject('email is not valid')
    }

    User.findOne({ email: email }, (err, user) => {
      if (err) {
        reject('error while querying user')
      } else if (!user) {
        reject("user doesn't exist")
      } else {
        resolve()
      }
    })
  })
}

function generateLink(attempts) {
  attempts = attempts || 0

  if (attempts > 10) {
    throw new Error('Redirected too many times.')
  }

  return new Promise(function(resolve, reject) {
    let link = uuidv4()

    PasswordRecovery.findOne({ link: link }, function(err, result) {
      if (!result) {
        resolve(link)
      } else if (err) {
        // need to try again
        console.log(err)
        reject()
      } else {
        reject()
      }
    })
  }).then(function(validLink) {
    return validLink === undefined ? generateLink(attempts + 1) : validLink
  })
}

function saveLink(link, email) {
  let result = { email, link }

  return new Promise(function(resolve, reject) {
    if (link === undefined || email === undefined) {
      reject('not enough parameters to save link')
    }

    PasswordRecovery.findOneAndUpdate(
      { email: email }, // conditions
      {
        link: link,
        createdAt: Date.now(),
      }, // updates
      function(err, doc) {
        // callback
        if (err) {
          reject('error while saving link')
        } else if (!doc) {
          // if email doesn't exist, then add new
          const newEntry = new PasswordRecovery({
            email: email,
            link: link,
          })

          newEntry.save(err => {
            if (err) {
              console.log('err', err)
              reject('error while saving link')
            } else {
              resolve(result)
            }
          })
        } else {
          resolve(result)
        }
      }
    )
  })
}

function generatePassword() {
  var length = 6,
    // charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789',
    retVal = ''
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

module.exports = router
