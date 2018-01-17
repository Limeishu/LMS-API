const KoaRouter         = require('koa-router')
const News              = require('../db').News

const news              = new KoaRouter()

news
  .get('/', async ctx => {
    await News.find({}, (err, data) => {
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
      const newNews = new News({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        date: new Date(),
        meta: ctx.request.body.meta
      })
      await newNews.save()
      ctx.body = { result: 0, nid: newNews._id }
    } catch (e) {
      ctx.body = { result: -1, e }
      console.log(e)
      next(e)
    }
  })
  .get('/:pid', async ctx => {
    await News.findOne({
      _id: ctx.params.pid
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
  .put('/:pid', async (ctx, next) => {
    try {
      const old = await News.findOne({ _id: ctx.params.pid })
      if (!old) {
        ctx.body = { result: -1 }
        return next()
      }
      const newNews = new News({
        _id: old._id,
        title: ctx.request.body.title ? ctx.request.body.title : old.title,
        content: ctx.request.body.content ? ctx.request.body.content : old.content,
        date: new Date(),
        meta: ctx.request.body.meta ? ctx.request.body.meta : old.meta
      })
      await old.update(newNews)
      ctx.body = { result: 0, nid: newNews._id }
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .delete('/:pid', async ctx => {
    await News.remove({
      _id: ctx.params.pid
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

module.exports = news
