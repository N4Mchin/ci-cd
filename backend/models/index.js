const mongoose = require('mongoose')

module.exports.connect = uri => {
  mongoose.connect(uri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    _createdAt: { type: String, unique: false },
  })

  mongoose.Promise = global.Promise
  //mongoose.set('debug', true);
  mongoose.connection.on('error', err => {
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })
  require('./user')
}
