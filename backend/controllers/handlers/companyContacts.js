const fastify = require('fastify')({ logger: true });

const development = require("../../knexfile").development;

const knex = require("knex")(development);


const getCompanyContactsHandler = async (req, reply) => {
    try { 
        const { id } = req.params;
        const result = await knex("companyContacts")
            .select()
            .where({'id': id})
            
        reply.send({ result: result[0], statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
};

module.exports = {
    getCompanyContactsHandler
};