const KoaRouter         = require('koa-router')
const Docs              = require('../db').Docs

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

module.exports = docs
