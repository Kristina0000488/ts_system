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

const getInfoCompanyHandler = async (req, reply) => {
    try { 
        const { id } = req.params;
        const result = await knex("companies")
            .select()
            .where({'id': id})
         /*
            knex('companies')
            .join('companyContacts', 'companies.id', 'companyContacts.id')
            .select()
            .where({'companies.id': id})
            .andWhere({'companyContacts.id': id})
        */
        reply.send({ result: result[0], statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
};

const updateInfoCompanyHandler = async (req, reply) => {
    try {
        const {  } = req.body;
        const { id } = req.params;
       
        await knex("companies")
          .where({'id': id})
          .update({
            name, 
            role, 
            updatedat: new Date().toDateString()
          });
        //console.log(updatedat, id)
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }

    return reply.send('Post updated');
};

module.exports = {
    getCompaniesHandler,
    getCompaniesListHandler,
    getInfoCompanyHandler,
    updateInfoCompanyHandler
};