const KoaRouter         = require('koa-router')
const User              = require('../db').User

const user              = new KoaRouter()

user
  .post('/', async ctx => {
    let account = new User({
      user: ctx.request.body.username,
      pwd: ctx.request.body.password
    })
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
  .put('/', async ctx => {
    let account = new User({
      user: ctx.request.body.username,
      pwd: ctx.request.body.password,
      permission: 2
    })
    await User.findOne(account, async(err, data) => {
      if (err) {
        ctx.body = {
          result: -1,
          err
        }
      } else if (!data) {
        ctx.body = {
          result: -2
        }
      } else {
        await User.update({
          _id: ctx.request.body.uid
        }, {
          user: ctx.request.body.username ? ctx.request.body.username : data.user,
          pwd: ctx.request.body.password ? ctx.request.body.password : data.pwd,
          permission: ctx.request.body.permission ? ctx.request.body.permission : data.permission,
          meta: ctx.request.body.meta ? ctx.request.body.meta : data.meta
        }, err => {
          if (err) {
            ctx.body = {
              result: -3,
              err
            }
          } else {
            ctx.body = {
              result: 0
            }
          }
        }).exec()
      }
    }).exec()
  })
  .delete('/:uid', async ctx => {
    await User.remove({
      _id: ctx.params.uid
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
  .post('/new', async(ctx, next) => {
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