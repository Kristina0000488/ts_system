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
        const { businessEntity, name, shortName, type } = req.body;
        const { id } = req.params;
       
        await knex("companies")
          .where({'id': id})
          .update({
            name, 
            businessEntity,
            shortName, 
            type,
            updatedat: new Date().toDateString()
          });

        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }

    return reply.send('Post updated');
};

const deleteInfoCompanyHandler = async (req, reply) => {    
    try {
        await knex("companies")
            .where("id", req.params.id)            
            .del()
        
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }
}

const addInfoCompanyHandler = async (req, reply) => {
    try { 
        const { name, shortName, businessEntity, type } = req.body;
        const contactId = await knex.select('id')
            .from('companyContacts');

        await knex("companies").insert({ 
            name,
            shortName,
            businessEntity,
            type, 
            contactId: contactId[contactId.length - 1].id, 
            createdat: new Date().toDateString() 
        });
        
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }
};

const searchCompanyHandler = async (req, reply) => {
    try { 
        const { name } = req.params; 
        const result = await knex("companies _-")
            .select('id', 'name', 'shortName')
            .where(
                knex.raw('LOWER("name") = ?', name)
            )
            .orWhere(
                knex.raw('LOWER("shortName") = ?', name)
            )
            
        reply.send({ result: result, statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
};

module.exports = {
    getCompaniesHandler,
    getCompaniesListHandler,
    getInfoCompanyHandler,
    updateInfoCompanyHandler,
    deleteInfoCompanyHandler,
    addInfoCompanyHandler,
    searchCompanyHandler
};