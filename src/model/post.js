import KoaRouter        from 'koa-router'
import { Post }         from '../db'

const post              = new KoaRouter()

post
  .get('/', async ctx => {
    await Post.find({}, (err, data) => {
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
      const newPost = new Post({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        date: new Date(),
        meta: ctx.request.body.meta
      })
      await newPost.save()
      ctx.body = { result: 0, pid: newPost._id }
    } catch (e) {
      ctx.body = { result: -1, e }
      console.log(e)
      next(e)
    }
  })
  .get('/:pid', async ctx => {
    await Post.findOne({
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
      const old = await Post.findOne({ _id: ctx.params.pid })
      if (!old) {
        ctx.body = { result: -1 }
        return next()
      }
      const newPost = new Post({
        _id: old._id,
        title: ctx.request.body.title ? ctx.request.body.title : old.title,
        content: ctx.request.body.content ? ctx.request.body.content : old.content,
        date: new Date(),
        meta: ctx.request.body.meta ? ctx.request.body.meta : old.meta
      })
      await old.update(newPost)
      ctx.body = { result: 0, pid: newPost._id }
    } catch (e) {
      console.log(e)
      next(e)
    }
  })
  .delete('/:pid', async ctx => {
    await Post.remove({
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

export default post
