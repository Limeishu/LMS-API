import KoaRouter        from 'koa-router'
import { User }         from '../db'
import Session          from '../modules/session'

const user              = new KoaRouter()

user
  .post('/', async (ctx, next) => {
    let account = {
      user: ctx.request.body.username,
      pwd: ctx.request.body.password
    }
    try {
      const userData = await User.findOne(account)
      if (!userData || userData.permission === -1) {
        ctx.body = { result: -1 }
        return next()
      }
      ctx.body = {
        result: 0,
        uid: userData._id,
        permission: userData.permission,
        meta: userData.meta
      }
      userData.meta ? userData.meta.lastIP = ctx.request.ip : userData.meta = { lastIP: ctx.request.ip }
      userData.session = new Session(userData).make
      await userData.update(userData)
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .put('/:uid', async (ctx, next) => {
    let account = {
      _id: ctx.params.uid,
      pwd: ctx.request.body.old_password
    }
    try {
      const old = await User.findOne(account)
      if (!old || old.permission === -1) {
        ctx.body = { result: -1 }
        return next()
      }
      const newUser = new User({
        _id: old._id,
        user: ctx.request.body.username ? ctx.request.body.username : old.user,
        pwd: ctx.request.body.password ? ctx.request.body.password : old.pwd,
        meta: ctx.request.body.meta ? ctx.request.body.meta : old.meta
      })
      await old.update(newUser)
      ctx.body = { result: 0 }
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .delete('/:uid', async ctx => {
    await User.remove({
      _id: ctx.params.uid,
      pwd: ctx.request.body.password
    }, (err) => {
      if (err) {
        ctx.body = {
          result: -1,
          err
        }
      } else {
        ctx.body = {
          result: 0
        }
      }
    }).exec()
  })
  .post('/new', async (ctx, next) => {
    const {
      username,
      password
    } = ctx.request.body
    try {
      const existed = await User.findOne({
        user: username
      })
      if (existed) {
        ctx.body = {
          result: -1
        }
        return next()
      }
      const account = new User({
        user: username,
        pwd: password,
        permission: -1
      })
      await account.save()
      ctx.body = {
        result: 0,
        uid: account._id
      }
    } catch (e) {
      console.log(e)
      next(e)
    }
    return next()
  })
export default user