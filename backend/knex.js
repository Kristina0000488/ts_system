const fp = require('fastify-plugin')
const knex = require('knex')

function knexPlugin(fastify, options, done) {
  if(!fastify.knex) {
    const knex = knex(options)
    fastify.decorate('knex', knex)

    fastify.addHook('onClose', (fastify, done) => {
      if (fastify.knex === knex) {
        fastify.knex.destroy(done)
      }
    })
  }

  done()
}

export default fp(knexPlugin, { name: 'fastify-knex-example' })