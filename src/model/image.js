import KoaRouter        from 'koa-router'
import { Image }        from '../db'

const image             = new KoaRouter()

image
  .get('/', async (ctx, next) => {
    try {
      const data = await Image.find()
      ctx.body = {
        result: 0,
        data
      }
    } catch (err) {
      ctx.body = {
        result: -1,
        err
      }
      next(err)
    }
  })
  .get('/:id', async (ctx, next) => {
    try {
      const data = await Image.findOne({
        _id: ctx.params.id
      })
      ctx.body = {
        result: 0,
        data
      }
    } catch (err) {
      ctx.body = {
        result: -1,
        err
      }
      next(err)
    }
  })

export default image
