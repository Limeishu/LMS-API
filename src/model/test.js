import KoaRouter        from 'koa-router'
import {
  name,
  version
}                       from '../../package.json'
const test              = new KoaRouter()

test
  .get('/', async ctx => {
    ctx.body = {
      name,
      version
    }
  })

export default test