const KoaRouter         = require('koa-router')
const Creation              = require('../db').Creation

const creation              = new KoaRouter()

creation
  .get('/', async ctx => {
    await Creation.find({}, (err, data) => {
      if (err || !data) {
        ctx.body = {
          result: -1,
          err
        }
      } else {
        ctx.body = {
          result: 0,
          data
        }
      }
    }).exec()
  })
  .post('/', async (ctx, next) => {
    try {
      const newCreation = new Creation({
        name: ctx.request.body.name,
        image: ctx.request.body.image,
        category: ctx.request.body.category,
        content: ctx.request.body.content,
        date: new Date(),
        meta: ctx.request.body.meta
      })
      await newCreation.save()
      ctx.body = { result: 0, nid: newCreation._id }
    } catch (e) {
      ctx.body = { result: -1, e }
      console.log(e)
      next(e)
    }
  })
  .get('/:cid', async ctx => {
    await Creation.findOne({
      _id: ctx.params.cid
    }, (err, data) => {
      if (err || !data) {
        ctx.body = {
          result: -1,
          err
        }
      } else {
        ctx.body = {
          result: 0,
          data
        }
      }
    }).exec()
  })
  .put('/:cid', async (ctx, next) => {
    try {
      const old = await Creation.findOne({ _id: ctx.params.cid })
      if (!old) {
        ctx.body = { result: -1 }
        return next()
      }
      const newCreation = new Creation({
        _id: old._id,
        name: ctx.request.body.name ? ctx.request.body.name : old.name,
        image: ctx.request.body.image ? ctx.request.body.image : old.image,
        category: ctx.request.body.category ? ctx.request.body.category : old.category,
        content: ctx.request.body.content ? ctx.request.body.content : old.content,
        date: new Date(),
        meta: ctx.request.body.meta ? ctx.request.body.meta : old.meta
      })
      await old.update(newCreation)
      ctx.body = { result: 0, nid: newCreation._id }
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .delete('/:cid', async ctx => {
    await Creation.remove({
      _id: ctx.params.cid
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

module.exports = creation
