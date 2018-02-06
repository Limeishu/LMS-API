const mongoose              = require('mongoose')
const mongooseUV            = require('mongoose-unique-validator')

const config                = require('../../config.json')

const Schema                = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  meta: Object
}, {
  collection: 'Post'
})

const newsSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  meta: Object
}, {
  collection: 'News'
})

const userSchema = new Schema({
  user: {
    type: String,
    require: true
  },
  pwd: {
    type: String,
    require: true
  },
  meta: Object
}, {
  collection: 'User'
})

const docsSchema = new Schema({
  type: {
    type: String,
    require: true
  },
  doc: Object
}, {
  collection: 'Docs'
})

postSchema.plugin(mongooseUV)
userSchema.plugin(mongooseUV)

const db = {
  Post: mongoose.model('Post', postSchema),
  News: mongoose.model('News', newsSchema),
  User: mongoose.model('User', userSchema),
  Docs: mongoose.model('Docs', docsSchema)
}

mongoose.Promise = global.Promise
mongoose.connect(
  config.db.uri, {
    useMongoClient: true
  }
)

module.exports = db
