const KoaRouter         = require('koa-router')
const User              = require('../db').User

const user              = new KoaRouter()

user
  .post('/', async ctx => {
    let account = {
      user: ctx.request.body.username,
      pwd: ctx.request.body.password
    }
    await User.findOne(account, (err, data) => {
      if (err || !data) {
        ctx.body = {
          result: -1,
          err
        }
      } else {
        ctx.body = {
          result: 0,
          uid: data._id
        }
      }
    }).exec()
  })
  .put('/:uid', async (ctx, next) => {
    let account = {
      _id: ctx.params.uid,
      pwd: ctx.request.body.password
    }
    try {
      const old = await User.findOne(account)
      if (!old) {
        ctx.body = { result: -1 }
        return next()
      }
      const newUser = new User({
        _id: old._id,
        user: ctx.request.body.username ? ctx.request.body.username : old.user,
        pwd: ctx.request.body.password ? ctx.request.body.password : old.pwd,
        permission: ctx.request.body.permission ? ctx.request.body.permission : old.permission,
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
        permission: 2
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
module.exports = user