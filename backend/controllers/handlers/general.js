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

const adminStatisticsHandler = async (req, reply) => {
    try {
        const result_companies = await knex("companies").count('id as CNT');
        const result_users     = await knex("users").where({'role': 'user'}).count('id as CNT');
        const result_admins    = await knex("users").where({'role': 'admin'}).count('id as CNT');        
        const result_all_users = await knex("users").count('id as CNT');

        const result = [
            { title: 'Count of admins', text: result_admins[0].CNT, color: 'blue' },
            { title: 'Count of users', text: result_users[0].CNT, color: 'red' },
            { title: 'Count of all users', text: result_all_users[0].CNT, color: 'orange' },
            { title: 'Count of companies', text: result_companies[0].CNT, color: 'yellow' },
        ];

        reply.send({ result, statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
};

module.exports = {
    verifyCookieHandler,
    adminStatisticsHandler
};