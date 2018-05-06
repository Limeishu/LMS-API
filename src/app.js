import Koa              from 'koa'
import KoaJson          from 'koa-json'
import bodyParser       from 'koa-bodyparser'
import cors             from '@koa/cors'
import path             from 'path'
import uploader         from 'koa2-file-upload'
import koaStatic        from 'koa-static'

import route            from './route'
import config           from '../config.json'

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
    origin: 'https://admin.limeishu.org.tw',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }))
app.use(cors({
    origin: '*',
    allowMethods: 'GET'
  }))
app.use(route.routes())
app.use(uploader(options))
app.use(koaStatic(path.join(__dirname, '/../public/')))
app.listen(config.port)
