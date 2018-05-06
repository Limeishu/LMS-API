const KoaRouter         = require('koa-router')
const { name, version } = require('../../package.json')
const test              = new KoaRouter()

test
  .get('/', async ctx => {
    ctx.body = {
      name,
      version
    }
  })

module.exports = test