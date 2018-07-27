import KoaRouter        from 'koa-router'

import config           from '../../config.json'
import fileUtil         from '../modules/file'

const upload =          new KoaRouter()

upload
  .post('/', async ctx => {
    const file = ctx.request.files.file
    const storagePath = config.serverPath
    const filePath = new fileUtil(file, storagePath).uploadFile()
    ctx.body = `{"${file.name}":"/${filePath}"}`
  })

export default upload