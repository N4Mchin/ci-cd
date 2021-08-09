require('module-alias/register')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('@config')
const cors = require('cors')
const fs = require('fs')
const CronJob = require('cron').CronJob
const { pathToRegexp } = require('path-to-regexp')

require('./models').connect(config.dbUri)
const app = express()
let server = app

const env = process.env.NODE_ENV || 'dev'
const APIV1 = '/api/v1'

console.log('ENV=', env)

if (env === 'dev') {
  server = require('http').createServer(app)
} else if (env === 'demo') {
  const key = fs.readFileSync(
    '/etc/letsencrypt/live/demo.livercenter.mn/privkey.pem'
  )
  const cert = fs.readFileSync(
    '/etc/letsencrypt/live/demo.livercenter.mn/fullchain.pem'
  )
  const https_options = {
    key: key,
    cert: cert,
  }

  server = require('https').createServer(https_options, app)
} else if (env === 'production') {
  // const key = fs.readFileSync('/home/admin/conf/web/ssl.app.livercenter.mn.key')
  // const cert = fs.readFileSync(
  //   '/home/admin/conf/web/ssl.app.livercenter.mn.pem'
  // )

  const key = fs.readFileSync(
    '/etc/letsencrypt/live/app.livercenter.mn/privkey.pem'
  )
  const cert = fs.readFileSync(
    '/etc/letsencrypt/live/app.livercenter.mn/fullchain.pem'
  )

  const https_options = {
    key: key,
    cert: cert,
  }

  server = require('https').createServer(https_options, app)
}

const whitelist = ['http://localhost:7000', `${config.frontend}`]

const corsOptions = {
  origin: function(origin, callback) {
    // return callback(null, true)

    if (env === 'production') {
      if (whitelist.indexOf(origin) !== -1) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    } else {
      // cypress ashiglahiin tuld demo deer origin.gui huselt zuwshuurnu
      return callback(null, true)
    }
  },
  allowedHeaders: ['x-access-token', 'Content-Type'],
  //header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  credentials: true,
}
// app.use('/', function(req, res, next) {
//   console.log(req.url)
//   next()
// })
app.use(
  corsException([`${APIV1}/eprescription/fingerprint`], cors(corsOptions))
)

app.use(cookieParser(config.secret)) // with secret key to sign cookies
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const authCheckMiddleware = require('./middleware/auth-check')
// routes
const authRoutes = require('./routes/auth')
const user = require('./routes/user')
const drugInfo = require('./routes/drugInfo')
const icd9 = require('./routes/icd9')
const token = require('./routes/token')
const menu = require('./routes/menu')
const patient = require('./routes/patient')
const practitioner = require('./routes/practitioner')
const fhir = require('./routes/fhir')
const serviceRequest = require('./routes/serviceRequest')
const report = require('./routes/report')
const statistics = require('./routes/statistics')
const valuesets = require('./routes/valuesets')
const laboratory = require('./routes/laboratory')
const phlebotomy = require('./routes/phlebotomy')
const resource = require('./routes/resource')
const batch_transaction = require('./routes/batch_transaction')
const search = require('./routes/search')
const file = require('./routes/file')
const eprescription = require('./routes/eprescription')
const externalSamples = require('./routes/externalsamples')
const ExternalSpecimenLog = require('./routes/ExternalSpecimenLog')
// print cookies
// app.use('*', function (req, res, next) {
//   // console.log('cookies: ', req.cookies)
//   // // console.log('signed_cookies: ', req.signedCookies['x-access-token'])
//   // console.log('signed_cookies: ', req.signedCookies['x-access-token'])
//   next()
// })

// app.use('*', function (req, res, next) {
//  console.log('referer: ', req.referer)
//   next()
// })

console.log('Before job instantiation')
// Cronjob('seconds minutes hours days months years)
// midnight at GMT time
const appointmentPlanning = require('@services/appointmentPlanning')
const midnightCronJob = new CronJob('00 00 04 * * *', function() {
  const d = new Date()
  console.log('Midnight:', d)

  appointmentPlanning.updateAppointmentPlanning()
})
console.log('After job instantiation')

// no authentication
app.use('/auth', authRoutes)
app.use(`${APIV1}`, eprescription)
app.use('/api', authCheckMiddleware)

// needs authentication
app.use(`${APIV1}`, user)
app.use(`${APIV1}`, menu)
app.use(`${APIV1}`, token)
app.use(`${APIV1}`, patient)
app.use(`${APIV1}`, practitioner)
app.use(`${APIV1}`, fhir)
app.use(`${APIV1}`, serviceRequest)
app.use(`${APIV1}`, report)
app.use(`${APIV1}`, statistics)
app.use(`${APIV1}`, laboratory)
app.use(`${APIV1}`, resource)
app.use(`${APIV1}`, batch_transaction)
app.use(`${APIV1}`, valuesets)
app.use(`${APIV1}`, phlebotomy)
app.use(`${APIV1}`, search)
app.use(`${APIV1}`, drugInfo)
app.use(`${APIV1}`, icd9)
app.use(`${APIV1}`, file)
app.use(`${APIV1}`, externalSamples)
app.use(`${APIV1}`, ExternalSpecimenLog)

midnightCronJob.start()

server.listen(3336, () => {
  console.log(`Server is listening at ${config.backend}`)
})

function corsException(path, fn) {
  var regexp = pathToRegexp(path)

  return function(req, res, next) {
    if (regexp.test(req.path)) {
      return next()
    } else {
      return fn(req, res, next)
    }
  }
}

process.on('SIGUSR2', () => {
  console.log('server is closing')
  server.close(() => {
    console.log('server is now closed')
    process.exit()
  })
})
