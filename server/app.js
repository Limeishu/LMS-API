const Koa               = require('koa')
const KoaJson           = require('koa-json')
const bodyParser        = require('koa-bodyparser')
const cors              = require('@koa/cors')

const route             = require('./route')
const config            = require('../config.json')
const app               = new Koa()

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
app.listen(config.port)
