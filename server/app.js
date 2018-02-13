const Koa               = require('koa')
const KoaJson           = require('koa-json')
const bodyParser        = require('koa-bodyparser')
const cors              = require('@koa/cors')
const path              = require('path')
const uploader          = require('koa2-file-upload')

const route             = require('./route')
const config            = require('../config.json')
const app               = new Koa()

const options = {
  url: '/upload',
  storeDir: '',
  provider: 'local',
  mimetypes: ['image/png', 'image/jpg', 'image/jpeg'],
  folder: 'public/images',
  urlPath: 'images'
}

app.use(bodyParser())
app.use(KoaJson())
app.proxy = true
app.use(cors({
  origin: '*',
  allowMethods: ['GET']
},
{
  origin: 'https://admin.limeishu.org.tw',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT']
}))
app.use(route.routes())
app.use(uploader(options))
app.use(require('koa-static')(path.join(__dirname, '/../public/')))
app.listen(config.port)
