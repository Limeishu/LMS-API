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
      const file = ctx.request.files.image
      const storagePath = config.serverPath
      const fileName = new fileUtil(file, storagePath).uploadFile()
      const newImage = new Image({
        fileName: file.name,
        path: `https://api.limeishu.org.tw/images/${fileName}`,
        date: new Date(),
        meta: ctx.request.body.meta || {}
      })
      await newImage.save()
      ctx.body = `{"${file.name}":"/images/${fileName}"}`
    } catch (err) {
      next(err)
    }
  })

export default upload