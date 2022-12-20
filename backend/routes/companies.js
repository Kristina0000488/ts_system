const {
  getCompaniesHandler,
  getCompaniesListHandler
} = require('../controllers/handlers/companies.js');


module.exports = async function (fastify) {  
  // companies
  fastify.get("/companies", {
    onRequest: [fastify.verifyToken],
    //schema: getAdminsSchema,
    handler: getCompaniesHandler,
  });
 // companies list
  fastify.get("/companiesList", {
    onRequest: [fastify.verifyToken],
    //schema: getAdminsSchema,
    handler: getCompaniesListHandler,
  });
}