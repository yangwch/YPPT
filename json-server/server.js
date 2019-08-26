const jsonServer = require('json-server')
const server = jsonServer.create()
const db = {
  'ppt_data': require('./ppt.json')
}
const middlewares = jsonServer.defaults()
server.use(middlewares)

server.use(jsonServer.rewriter({
  '/api/ppt': '/ppt_data'
}))

server.use(jsonServer.router(db))
server.listen(3000, () => {
  console.log('JSON Server is running')
})
