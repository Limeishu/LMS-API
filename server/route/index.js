const KoaRouter         = require('koa-router')
const model             = require('../model')
const route             = new KoaRouter()

route.use('/creation', model.creation.routes(), model.creation.allowedMethods())
route.use('/user', model.user.routes(), model.user.allowedMethods())
route.use('/post', model.post.routes(), model.post.allowedMethods())
route.use('/news', model.news.routes(), model.news.allowedMethods())
route.use('/docs', model.docs.routes(), model.docs.allowedMethods())
route.use('/',     model.test.routes(), model.test.allowedMethods())

module.exports = route
