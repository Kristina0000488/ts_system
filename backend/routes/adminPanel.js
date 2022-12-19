const {
    addUserSchema,
    updateUserSchema,
    getAdminsSchema,
    getUsersSchema,
    deleteUserSchema,
    getAllUsersTablerSchema
} = require('../controllers/schemas/adminPanel.js');

const {
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getAdminsHandler,
    getUsersHandler,
    getAllUsersTableHandler
} = require('../controllers/handlers/adminPanel.js');


module.exports = async function (fastify) {  
  // create an user
  fastify.post('/admin-panel/users/new', {
    onRequest: [fastify.verifyToken],
    //schema: addUserSchema,
    handler: addUserHandler,
  },);

  // update an user
  fastify.put('/admin-panel/users/edit/:id', {
    onRequest: [fastify.verifyToken], 
    //schema: updateUserSchema,
    handler: updateUserHandler,
  },);

  // delete an user
  fastify.delete('/admin-panel/users/delete/:id', {
    onRequest: [fastify.verifyToken],
    //schema: deleteUserSchema,
    handler: deleteUserHandler,
  },);

  fastify.get("/admin-panel/admins", {
    onRequest: [fastify.verifyToken],
    schema: getAdminsSchema,
    handler: getAdminsHandler,
  });

  fastify.get("/admin-panel/users", {
    onRequest: [fastify.verifyToken],
    schema: getUsersSchema,
    handler: getUsersHandler,
  });

  fastify.post('/admin-panel/allUsersTable', {
    onRequest: [fastify.verifyToken],
    schema: getAllUsersTablerSchema,
    handler: getAllUsersTableHandler,
  },);
};;


/*
const addUserOpts = {
    schema: addUserSchema,
    handler: addUserHandler,
};

const updateUserOpts = {
    schema: updateUserSchema,
    handler: updateUserHandler,
};

const deleteUserOpts = {
    schema: deleteUserSchema,
    handler: deleteUserHandler,
};*/

/*
module.exports = async function (fastify, opts) {
  fastify.get(
    '/admin-panel/users/:id',
    {
      preHandler: [fastify.authenticate],
    },
    async function (request, reply) {
      // the user's id is in request.user
      return { read: request.params.document };
    },
  );

  fastify.get(
    '/admin-panel/users/:id',
    {
      onRequest: [fastify.authenticate],
    },
    async function (request, reply) {
      // the user's id is in request.user
      return { read: request.params.document };
    },
  );
};*/

/*
async function privateAdminPanelRoutes (fastify) {
    // create an user
    fastify.post('/admin-panel/users/new', {
      preHandler: [fastify.authenticate],
      schema: addUserSchema,
      handler: addUserHandler,
      //...addUserOpts
    });
  
    // update an user
    fastify.put('/admin-panel/users/edit/:id', {
      preHandler: [fastify.authenticate], 
      schema: updateUserSchema,
      handler: updateUserHandler,
      //...updateUserOpts
    });
  
    // delete an user
    fastify.delete('/admin-panel/users/:id', {
      preHandler: [fastify.authenticate],
      schema: deleteUserSchema,
      handler: deleteUserHandler,
      //...deleteUserOpts
    });
};
*/