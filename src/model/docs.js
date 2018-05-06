import KoaRouter        from 'koa-router'
import { Docs }         from '../db'

const docs              = new KoaRouter()

docs
  .get('/:type', async ctx => {
    await Docs.findOne({
      type: ctx.params.type
    }, (err, data) => {
      if (err || !data) {
        ctx.body = {
          result: -1,
          err
        }
      } else {
        ctx.body = {
          result: 0,
          data: data.doc
        }
      }
    }).exec()
  })

export default docs
