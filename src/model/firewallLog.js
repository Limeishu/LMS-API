import KoaRouter        from 'koa-router'
import { FirewallLog }  from '../db'

const firewallLog       = new KoaRouter()

firewallLog
  .get('/', async (ctx, next) => {
    try {
      let data = await FirewallLog.find()
      ctx.body = {
        result: 0,
        data
      }
    } catch (err) {
      throw err
      next(err)
    }
  })
  .get('/proto/:proto', async (ctx, next) => {
    try {
      let data = await FirewallLog.find({ proto: ctx.params.proto })
      ctx.body = {
        result: 0,
        data
      }
    } catch (err) {
      throw(err)
      next(err)
    }
  })
  .get('/ip/:ip', async (ctx, next) => {
    try {
      let data = await FirewallLog.find({ ip: ctx.params.ip })
      ctx.body = {
        result: 0,
        data
      }
    } catch (err) {
      throw(err)
      next(err)
    }
  })
  .get('/mac/:mac', async (ctx, next) => {
    try {
      let data = await FirewallLog.find({ mac: ctx.params.mac })
      ctx.body = {
        result: 0,
        data
      }
    } catch (err) {
      throw(err)
      next(err)
    }
  })

export default firewallLog
