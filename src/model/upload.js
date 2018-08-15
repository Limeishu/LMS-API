import KoaBody          from 'koa-body'
import KoaRouter        from 'koa-router'
import { Image, User }  from '../db'

import config           from '../../config.json'
import fileUtil         from '../modules/file'
import Session          from '../modules/session'

const upload =          new KoaRouter()

upload
  .use(KoaBody({
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024
    }
  }))
  .post('/', async (ctx, next) => {
    try {
      const auth = await User.findOne({ _id: ctx.request.body.uid })
      if (!auth || (auth.permission === -1) || (new Session({_id: ctx.request.body.uid, meta: {lastIP: ctx.request.ip}}).make !== auth.session)) {
        ctx.body = { result: -1 }
        return next()
      }
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