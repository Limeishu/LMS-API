import Koa              from 'koa'
import KoaJson          from 'koa-json'
import bodyParser       from 'koa-bodyparser'
import cors             from '@koa/cors'
import path             from 'path'
import koaStatic        from 'koa-static'

import route            from './route'
import config           from '../config.json'

const app               = new Koa()

app.use(bodyParser())
app.use(KoaJson())
app.proxy = true
app.use(cors({
    origin: 'https://admin.limeishu.org.tw',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }))
app.use(cors({
    origin: '*',
    allowMethods: 'GET'
  }))
app.use(route.routes())
app.use(koaStatic(path.join(__dirname, '/../public/')))
app.listen(config.port)
