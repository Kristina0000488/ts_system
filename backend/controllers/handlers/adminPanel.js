const fastify = require('fastify')({ logger: true });

const development = require("../../knexfile").development;

const knex = require("knex")(development);


const addUserHandler = async (req, reply) => {
    try {
        const { name, password, role, createdat } = req.body;

        const result = await knex("users").insert({ name, password, role, createdat });
        
        reply.send({ result: "success" });
    } catch (err) {
        fastify.log.error(err);
    }
};

const updateUserHandler = async (req, reply) => {
    try {
        const { name, password, role, createdat } = req.body;
        const { id } = req.params;

        const result = await knex("users")
          .update({
            name, password, role, createdat
          })
          .where('id', id);
        
          reply.send({ result: "success" });
    } catch (err) {
        fastify.log.error(err);
    }

    return reply.send('Post updated');
};

const deleteUserHandler = async (req, reply) => {    
    let result = null;

    try {
        result = await knex("users")
        .delete()
        .whereIn("id", [ ...req.params.id ]);
        
        reply.send({ result: "success" });
    } catch (err) {
        fastify.log.error(err);
    }
}

const getAdminsHandler = async (req, reply) => {    
    let result = null;

    try {
        result = await knex("users")
        .select("id", "name", "role", "createdat")
        .where("role", "admin")

        reply.send({ result, status: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
}

const getUsersHandler = async (req, reply) => {    
    let result = null;

    try {
        result = await knex("users")
            .select("id", "name", "role", "createdat")

        reply.send({ result, status: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
}


module.exports = {
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getAdminsHandler,
    getUsersHandler
};