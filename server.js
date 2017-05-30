const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('activities.json')
const middlewares = jsonServer.defaults()

var cors = require('cors')


server.use(cors())

server.use(middlewares)
server.use((req, res, next) => {
  console.log(req);
        next() // continue to JSON Server router

})
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
