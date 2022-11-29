const fastifyJwt = require('@fastify/jwt')
const fp = require('fastify-plugin')

async function customJwtAuth(fastify, opts, next) {
  fastify.register(fastifyJwt, { 
    secret: 'my_jwt_secret', 
    cookie: {
      cookieName: 'cookie',
      signed: false
    } 
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      // to whatever you want, read the token from cookies for example..
      const token = request.cookies;
      console.log(token, 222)
      await [fastify.verifyToken];      
    } catch (err) {
      reply.send(err)
    }
  })
}

module.exports = fp(customJwtAuth)
//, { fastify: '>=1.0.0' }