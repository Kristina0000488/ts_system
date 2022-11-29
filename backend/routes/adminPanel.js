const {
    addUserSchema,
    updateUserSchema,
    deleteUserSchema,
} = require('../controllers/schemas/adminPanel.js');

const {
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
    getAdminsHandler
} = require('../controllers/handlers/adminPanel.js');

const customJwtAuth = require('../plugins/authJwt');


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
};
/*
const adminPanelRoutes = (fastify, opts, done) => {
    fastify
      .register(require('@fastify/auth'))
      .after(() => privateAdminPanelRoutes(fastify));
  
    done();
};*/
  
async function privateAdminPanelRoutes (fastify) {
    // create an user
    fastify.post('/admin-panel/users/new', {
      preHandler: [fastify.authenticate],//  [fastify.authenticate],//fastify.getAuth([fastify.verifyToken]),
      schema: addUserSchema,
      handler: addUserHandler,
      //...addUserOpts
    });
  
    // update an user
    fastify.put('/admin-panel/users/edit/:id', {
      preHandler: [fastify.authenticate], //preHandler: [fastify.authenticate],//([fastify.verifyToken]),
      schema: updateUserSchema,
      handler: updateUserHandler,
      //...updateUserOpts
    });
  
    // delete an user
    fastify.delete('/admin-panel/users/:id', {
      preHandler: [fastify.authenticate],//preHandler: fastify.authenticate(), // [fastify.authenticate],//fastify.getAuth([fastify.verifyToken]),
      schema: deleteUserSchema,
      handler: deleteUserHandler,
      //...deleteUserOpts
    });
};

module.exports = async function (fastify) {
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
  // create an user
  fastify.post('/admin-panel/users/new', {
    onRequest: [fastify.authenticate],//  [fastify.authenticate],//fastify.getAuth([fastify.verifyToken]),
    schema: addUserSchema,
    handler: addUserHandler,
    //...addUserOpts
  },);

  // update an user
  fastify.put('/admin-panel/users/edit/:id', {
    onRequest: [fastify.verifyToken], //preHandler: [fastify.authenticate],//([fastify.verifyToken]),
    schema: updateUserSchema,
    handler: updateUserHandler,
    //...updateUserOpts
  },);

  // delete an user
  fastify.delete('/admin-panel/users/:id', {
    onRequest: [fastify.verifyToken],//preHandler: fastify.authenticate(), // [fastify.authenticate],//fastify.getAuth([fastify.verifyToken]),
    schema: deleteUserSchema,
    handler: deleteUserHandler,
    //...deleteUserOpts
  },);

  fastify.get("/admin-panel/admins", {
    onRequest: [fastify.verifyToken],
    handler: getAdminsHandler,
  });
};;
   // adminPanelRoutes

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
};*/