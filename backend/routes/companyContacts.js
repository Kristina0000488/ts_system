const {
  getCompanyContactsHandler,
  updateCompanyContactsHandler
} = require('../controllers/handlers/companyContacts.js');


module.exports = async function (fastify) {  
  //company contacts
  fastify.get("/contacts/:id", {
    onRequest: [fastify.verifyToken],
    //schema: getAdminsSchema,
    handler: getCompanyContactsHandler,
  });
  // update contacts
  fastify.put('/companies/edit/:id', {
    onRequest: [fastify.verifyToken], 
    //schema: updateUserSchema,
    handler: updateCompanyContactsHandler,
  });
}