import KoaRouter        from 'koa-router'
import model            from '../model'

const route             = new KoaRouter()

route.use('/firewallLog', model.firewallLog.routes(), model.firewallLog.allowedMethods())
route.use('/creation', model.creation.routes(), model.creation.allowedMethods())
route.use('/upload', model.upload.routes(), model.upload.allowedMethods())
route.use('/user', model.user.routes(), model.user.allowedMethods())
route.use('/post', model.post.routes(), model.post.allowedMethods())
route.use('/news', model.news.routes(), model.news.allowedMethods())
route.use('/docs', model.docs.routes(), model.docs.allowedMethods())
route.use('/',     model.test.routes(), model.test.allowedMethods())

export default route
