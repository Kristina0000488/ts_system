const fastify = require('fastify')({ logger: true });

const development = require("../../knexfile").development;

const knex = require("knex")(development);


const verifyCookieHandler = async (req, reply) => {
    try { 

        const { token } = req.cookies;

        if (token) {
            const result = await knex("users")
            .select("name", "id", "role", "createdat", "updatedat")
            .where({ 'token': token });
  
        //console.log(result, '   toktok')
          reply
            .code(200)
            .send({ statusCode: 200, message: 'Valid token', result: result[0] });
        } else {
            reply
              .code(404)
              .send({ statusCode: 404, message: 'Invalid token' });
        }

    } catch (err) {
        fastify.log.error(err);
    }
};

module.exports = {
    verifyCookieHandler,
};