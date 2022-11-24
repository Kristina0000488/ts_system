// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const jwt = require('jsonwebtoken');
//const fp = require('fastify-plugin');
//const knex = require('knex');
const development = require("./knexfile").development;

(async () => {
  try {
    const knex = require("knex")(development);

    //REST

    fastify.post("/login", async (req, res) => {
      let result = null;
      let token = null;

      try {
        const { name, password } = req.body;

        result = await knex("users")
        .select("name", "password", "id")
        .where({'name': name, 'password': password});

        if (!result) {
          return fastify.log.error();
        } else {
          // sign a token          
          token = await new Promise((resolve,reject) => {
            jwt.sign(
              { id: result[0].id },
              'my_jwt_secret',
              { expiresIn: 3 * 86400 },
              (err, _token) => {
                if (err) {
                  fastify.log.error(err); 
                  reject();
                }
                
                if (_token) { 
                  token = _token;
                  resolve(_token);
                }
              }
            )
          });

          return { result, status: 200, authorization: token };
        }

      } catch (err) {
        fastify.log.error(err);
      }
    });

    fastify.get("/users", async (req, res) => {
      let result = null;
      try {
        result = await knex("users")
          .select("id", "name", "role", "createdat")
      } catch (err) {
        fastify.log.error(err);
      }
      return { result };
    });

    fastify.get("/admins", async (req, res) => {
      let result = null;
      try {
        result = await knex("users")
          .select("id", "name", "role", "createdat")
          .where("role", "admin")
      } catch (err) {
        fastify.log.error(err);
      }
      return { result };
    });

    fastify.post("/add-user", async (req, res) => {
      try {
        const { name, password, role, createdat } = req.body;

        const result = await knex("users").insert({ name, password, role, createdat });
        
        return { result: "success" };
      } catch (err) {
        fastify.log.error(err);
      }
    });

    fastify.get("/remove-user/:id", async (req, res) => {
      let result = null;

      try {
        result = await knex("users")
        .delete()
        .whereIn("id", [ ...req.params.id ]);
        
        return { result: "success"};
      } catch (err) {
        fastify.log.error(err);
      }
    });

    fastify.post("/update-user/:id", async (req, res) => {
      try {
        const { name, password, role, createdat } = req.body;

        const result = await knex("users")
          .update({
            name, password, role, createdat
          })
          .where('rowid', req.params.id);
        
        return { result: "success" };
      } catch (err) {
        fastify.log.error(err);
      }
    });



    /*fastify.get("/add-person", async (req, res) => {
      try {
        const result = await knex("people").insert([
          { name: "John", phone: 913, email: "albert@email.com" },
          { name: "Albert" }
        ]);
      } catch (err) {
        fastify.log.error(err);
      }
      return { result: "success" };
    });
    fastify.post("/add-custom-person", async (req, res) => {
      try {
        const { name, email, phone } = req.body;
        const result = await knex("people").insert({ name, phone, email });
      } catch (err) {
        fastify.log.error(err);
      }
      return { result: "success" };
    });

    fastify.get("/person/:id", async (req, res) => {
      let result = null;
      try {
        result = await knex
          .from("people")
          .select("name")
          .where("id", req.params.id);
      } catch (err) {
        fastify.log.error(err);
      }
      return { result };
    });
    fastify.get("/people", async (req, res) => {
      let result = null;
      try {
        result = await knex
          .from("people")
          .select("id", "name", "email", "phone");
      } catch (err) {
        fastify.log.error(err);
      }
      return { result };
    });*/


    await fastify.listen(3001, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

//const config = require('./db-config')
//const db = knex(config);
/*
function registerPlugins(fastify, opts, next) {
  fastify.registerPlugins(require('fastify-knex'), {
    client: 'pg',
    debug: true, // Knex debug SQL
    connection: 'psql://angel:Som3p@ss@localhost:5432/angel'
  });

  fastify.registerRoutes(registerRoutes);

  done();

  function registerRoutes(fastify, opts, next) {
    fastify.get('/', async req => {
      // Get Knex object here..
      const users = await fastify.knex.select().from('users');
      console.log(users);
      return users;
    });
  }
}

fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      // request needs to have a querystring with a `name` parameter
      querystring: {
        //name: { type: 'string' },
        //password: { type: 'string' }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          //type: 'string',
          /*properties: {
            statusCode: '204', 
            message: 'User is valid', 
          }
        }
      }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      //console.log(db.find());
      //return db.find();
      
      return users;
    }
  })
  
  const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

start();
registerPlugins(fastify);*/