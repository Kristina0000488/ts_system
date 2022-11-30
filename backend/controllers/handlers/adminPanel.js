const fastify = require('fastify')({ logger: true });

const development = require("../../knexfile").development;

const knex = require("knex")(development);


const addUserHandler = async (req, reply) => {
    try {
        const { name, password, role, createdat } = req.body;

        const result = await knex("users").insert({ name, password, role, createdat });
        
        reply.send({ result: "success", statusCode: 200 });
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
        
          reply.send({ result: "success", statusCode: 200 });
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
        
        reply.send({ result: "success", statusCode: 200 });
    } catch (err) {
        fastify.log.error(err);
    }
}

const getAdminsHandler = async (req, reply) => {    
    let result = null;

    try {
        result = await knex("users")
        .select("id", "name", "role", "createdat", "updatedat")
        .where("role", "admin")

        reply.send({ result, statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
}

const getUsersHandler = async (req, reply) => {    
    let result = null;

    try {
        result = await knex("users")
            .select("id", "name", "role", "createdat", "updatedat")

        reply.send({ result, statusCode: 200 });
    } catch (err) {
      fastify.log.error(err);
    }
}

const getAllUsersTableHandler = async (req, reply) => {    
    let result = null;

    try {
        result = await knex("users")
            .select("id", "name", "role", "createdat");

        if (result.length > 0)
        {
            const { page, rowAmount } = req.body;           

            let amountUsers = result.length;
            let amountPages = Math.ceil( amountUsers / rowAmount );

            let preparedRes = await [ ...result ].map( item => {
                return {
                    id: item.id,
                    userName: item.name,
                    role: item.role,
                    createdAt: item.createdat
                }
            } ) ;
                       
            if (rowAmount === 0) { 
                await reply.send({ page, amountPages, rowAmount, amountUsers, result: preparedRes, statusCode: 200 });
            }

            const res = [];

            for (let i = 0, page = 0; i < amountUsers; i += rowAmount, page += 1) {                
                const chunk = await preparedRes.slice(i, i + rowAmount);

                await res.push(chunk);

                if (page ===  page) break;
            } preparedRes
            console.log(res);
            await reply.send({ page, amountPages, rowAmount, amountUsers, result: res[ page ], statusCode: 200 });
        }        
    } catch (err) {
      fastify.log.error(err);
    }
}



module.exports = {
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getAdminsHandler,
    getUsersHandler,
    getAllUsersTableHandler
};