const {
  getCompaniesHandler,
  getCompaniesListHandler,
  getInfoCompanyHandler,
  updateInfoCompanyHandler
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
  // info company
  fastify.get("/companies/:id", {
    onRequest: [fastify.verifyToken],
    //schema: getAdminsSchema,
    handler: getInfoCompanyHandler,
  });

  // update info company
  fastify.put('/companies/edit/:id', {
    onRequest: [fastify.verifyToken], 
    //schema: updateUserSchema,
    handler: updateInfoCompanyHandler,
  },);
}