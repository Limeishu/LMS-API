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
  paragraph: {
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

const creationSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  content: {
    type: Object,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  meta: Object
}, {
  collection: 'Creation'
})

postSchema.plugin(mongooseUV)
userSchema.plugin(mongooseUV)
creationSchema.plugin(mongooseUV)

const db = {
  Post: mongoose.model('Post', postSchema),
  News: mongoose.model('News', newsSchema),
  User: mongoose.model('User', userSchema),
  Docs: mongoose.model('Docs', docsSchema),
  Creation: mongoose.model('Creation', creationSchema)
}

mongoose.Promise = global.Promise
mongoose.connect(
  config.db.uri, {
    useMongoClient: true
  }
)

module.exports = db
