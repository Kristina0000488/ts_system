const {
    verifyCookieSchema,
} = require('../controllers/schemas/general.js');

const {
    verifyCookieHandler,
    adminStatisticsHandler
} = require('../controllers/handlers/general.js');


module.exports = async function (fastify) {  
  // verify cookie
  fastify.get('/verifycookie', {
    onRequest: [fastify.verifyToken],
   // schema: verifyCookieSchema,
    handler: verifyCookieHandler,
  });
  // get statistics for admin dashboard
  fastify.get('/adminstatistics', {
    onRequest: [fastify.verifyToken],
   // schema: verifyCookieSchema,
    handler: adminStatisticsHandler,
  });
}