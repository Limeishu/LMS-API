const Koa               = require('koa')
const KoaJson           = require('koa-json')
const bodyParser        = require('koa-bodyparser')

const route             = require('./route')
const config            = require('../config.json')
const app               = new Koa()

app.use(bodyParser())
app.use(KoaJson())
app.use(route.routes())
app.listen(config.port)
