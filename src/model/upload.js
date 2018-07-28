import KoaRouter        from 'koa-router'
import { Image }        from '../db'

import config           from '../../config.json'
import fileUtil         from '../modules/file'

const upload =          new KoaRouter()

upload
  .post('/', async ctx => {
    try {
      const file = ctx.request.files.file
      const storagePath = config.serverPath
      const filePath = new fileUtil(file, storagePath).uploadFile()
      ctx.body = `{"${file.name}":"/${filePath}"}`
    } catch (err) {
      next(err)
      throw new Error(err)
    }
  })

export default upload