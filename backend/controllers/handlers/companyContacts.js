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

const updateCompanyContactsHandler = async (req, reply) => {
    try {
        const { email, firstname, lastname, phone, patronymic } = req.body;
        const { id } = req.params;
        console.log(req.body);
        await knex("companyContacts")
          .where({'id': +id})
          .update({
            email,
            firstname,
            lastname,
            patronymic,
            phone,
            updatedat: new Date().toDateString()
          });

          const select = await knex("companyContacts")
          .select('*')
          .where({'id': +id})
        console.log(select, id)
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }

    return reply.send('Post updated');
};

const deleteCompanyContactsHandler = async (req, reply) => {    
    try {
        await knex("companyContacts")
            .where("id", +req.params.id)            
            .del()
        
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }
}

const addCompanyContactsHandler = async (req, reply) => {
    try { 
        const { email, firstname, lastname, patronymic, phone } = req.body;

        await knex("companyContacts").insert({ email, firstname, lastname, patronymic, phone, createdat: new Date().toDateString() });
        
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }
};

module.exports = {
    getCompanyContactsHandler,
    updateCompanyContactsHandler,
    deleteCompanyContactsHandler,
    addCompanyContactsHandler
};