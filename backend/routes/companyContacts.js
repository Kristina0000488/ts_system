const {
  getCompanyContactsHandler,
  updateCompanyContactsHandler,
  deleteCompanyContactsHandler,
  addCompanyContactsHandler
} = require('../controllers/handlers/companyContacts.js');


module.exports = async function (fastify) {  
  //company contacts
  fastify.get("/contacts/:id", {
    onRequest: [fastify.verifyToken],
    //schema: getAdminsSchema,
    handler: getCompanyContactsHandler,
  });
  // update contacts
  fastify.put('/contacts/edit/:id', {
    onRequest: [fastify.verifyToken], 
    //schema: updateUserSchema,
    handler: updateCompanyContactsHandler,
  });
  // delete contacts
  fastify.delete('/contacts/delete/:id', {
    onRequest: [fastify.verifyToken],
    //schema: deleteUserSchema,
    handler: deleteCompanyContactsHandler,
  });
  // create contacts
  fastify.post('/contacts/new', {
    onRequest: [fastify.verifyToken],
    //schema: addUserSchema,
    handler: addCompanyContactsHandler,
  });
}