import KoaBody          from 'koa-body'
import KoaRouter        from 'koa-router'
import { Image }        from '../db'

import config           from '../../config.json'
import fileUtil         from '../modules/file'

const upload =          new KoaRouter()

upload
  .use(KoaBody({
    multipart: true,
    formidable: {
      maxFileSize: 20 * 1024 * 1024
    }
  }))
  .post('/', async (ctx, next) => {
    try {
      const file = ctx.request.files.file
      const storagePath = config.serverPath
      const filePath = new fileUtil(file, storagePath).uploadFile()
      const newImage = new Image({
        fileName: file.name,
        path: `https://api.limeishu.org.tw/${filePath}`,
        date: new Date(),
        meta: ctx.request.body.meta || {}
      })
      await newImage.save()
      ctx.body = `{"${file.name}":"/${filePath}"}`
    } catch (err) {
      next(err)
    }
  })

export default upload