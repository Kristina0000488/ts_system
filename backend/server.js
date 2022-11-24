// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

fastify.route({
    method: 'POST',
    url: '/authorization',
    schema: {
      // request needs to have a querystring with a `name` parameter
      querystring: {
        name: { type: 'string' },
        password: { type: 'string' }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          //type: 'string',
          /*properties: {
            statusCode: '204', 
            message: 'User is valid', 
          }*/
        }
      }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      return { hello: 'world' }
    }
  })
  
  const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

start();