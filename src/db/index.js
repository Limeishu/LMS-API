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

const firewallLogSchema = new Schema({
  timestamp: {
    type: String,
    required: true
  },
  mac: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  proto: {
    type: String,
    required: true
  }
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
  permission: {
    type: Number,
    require: true
  },
  meta: Object
}, {
  collection: 'News'
})

const userSchema = new Schema({
  user: {
    type: String,
    lowercase: true,
    require: true
  },
  pwd: {
    type: String,
    require: true
  },
  permission: {
    type: Number,
    required: true,
  },
  section: String,
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
firewallLogSchema

const db = {
  Post: mongoose.model('Post', postSchema),
  News: mongoose.model('News', newsSchema),
  User: mongoose.model('User', userSchema),
  Docs: mongoose.model('Docs', docsSchema),
  Creation: mongoose.model('Creation', creationSchema),
  FirewallLog: mongoose.model('FirewallLog', firewallLogSchema)
}

mongoose.Promise = global.Promise
mongoose.connect(
  config.db.uri, {
    useMongoClient: true
  }
)

module.exports = db