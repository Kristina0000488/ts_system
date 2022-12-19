const {
    verifyCookieSchema,
} = require('../controllers/schemas/general.js');

const {
    verifyCookieHandler,
} = require('../controllers/handlers/general.js');


module.exports = async function (fastify) {  
  // verify cookie
  fastify.get('/verifycookie', {
    onRequest: [fastify.verifyToken],
   // schema: verifyCookieSchema,
    handler: verifyCookieHandler,
  });
}