const KoaRouter         = require('koa-router')
const News              = require('../db').News

const news              = new KoaRouter()

news
  .get('/', async ctx => {
    let condition = ctx.get('Origin') === 'https://admin.limeishu.org.tw' ? {} : { permission: 0 }
    await News.find(condition, (err, data) => {
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
        paragraph: ctx.request.body.paragraph,
        date: ctx.request.body.date,
        permission: ctx.request.body.permission,
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
  .get('/:nid', async (ctx, next) => {
    try {
      const data = await News.findOne({ _id: ctx.params.nid })
      if (!data) {
        ctx.body = { result: -1 }
        return next()
      }
      ctx.body = { result: 0, data }
    } catch (err) {
      ctx.body = {
        result: -1,
        err
      }
      console.log(e)
      next(e)
    }
  })
  .put('/:nid', async (ctx, next) => {
    try {
      const old = await News.findOne({ _id: ctx.params.nid })
      if (!old) {
        ctx.body = { result: -1 }
        return next()
      }
      const newNews = new News({
        _id: old._id,
        title: ctx.request.body.title ? ctx.request.body.title : old.title,
        content: ctx.request.body.content ? ctx.request.body.content : old.content,
        paragraph: ctx.request.body.paragraph ? ctx.request.body.paragraph : old.paragraph,
        date: ctx.request.body.date ? ctx.request.body.date : old.date,
        permission: ctx.request.body.permission,
        meta: ctx.request.body.meta ? ctx.request.body.meta : old.meta
      })
      await old.update(newNews)
      ctx.body = { result: 0, nid: newNews._id }
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .delete('/:nid', async ctx => {
    await News.remove({
      _id: ctx.params.nid
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
