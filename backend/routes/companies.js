const {
  getCompaniesHandler,
  getCompaniesListHandler,
  getInfoCompanyHandler,
  updateInfoCompanyHandler,
  deleteInfoCompanyHandler,
  addInfoCompanyHandler,
  searchCompanyHandler
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

  // delete a company
  fastify.delete('/companies/delete/:id', {
    onRequest: [fastify.verifyToken],
    //schema: deleteUserSchema,
    handler: deleteInfoCompanyHandler,
  });

  // create a company
  fastify.post('/companies/new', {
    onRequest: [fastify.verifyToken],
    //schema: addUserSchema,
    handler: addInfoCompanyHandler,
  });

  // search company
  fastify.get("/search/:name", {
    onRequest: [fastify.verifyToken],
    //schema: getAdminsSchema,
    handler: searchCompanyHandler,
  });
}