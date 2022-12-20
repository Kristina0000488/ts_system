const fastify = require('fastify')({ logger: true });

const development = require("../../knexfile").development;

const knex = require("knex")(development);


const getCompaniesHandler = async (req, reply) => {
    try {
        const result = await knex("companies")
            .select();

        reply.send({ result, statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
};

const getCompaniesListHandler = async (req, reply) => {
    try {
        const result = await knex("companies")
            .select("id", "name");

        reply.send({ result, statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
};

module.exports = {
    getCompaniesHandler,
    getCompaniesListHandler
};