import KoaRouter        from 'koa-router'
import { DiskUsage }     from '../db'

const diskUsage          = new KoaRouter()

diskUsage
  .get('/', async ctx => {
    const datasets = await DiskUsage.find({})
    ctx.body = {
      result: 0,
      data: datasets
    }
  })
  .post('/', async ctx => {
    try {
      const newDataset = new DiskUsage({
        date: ctx.request.body.date,
        free: ctx.request.body.free,
        size: ctx.request.body.size
      })
      await newDataset.save()
      ctx.body = { result: 0 }
    } catch (err) {
      ctx.body = { result: -1, err }
      next(err)
    }
  })

export default diskUsage
