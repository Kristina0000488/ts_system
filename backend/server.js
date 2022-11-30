const fastify = require('fastify')({ logger: true });
const jwt = require('jsonwebtoken');
const authJwt = require('./plugins/authJwt');
const development = require("./knexfile").development;
const adminPanelRoutes = require('./routes/adminPanel');

const verifyToken = (req, reply, done) => {
  const { token } = req.cookies;
  
  jwt.verify(token, 'my_jwt_secret', (err, decoded) => {
    
    if (err) {
      done(new Error('Unauthorized'));
    }
    
    req.user = {
      id: decoded.id, // pass in the user's info
    };
  });

  done();
};

fastify.register(require('@fastify/cookie'), {
  secret: "my_jwt_secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
})

fastify.register(require('@fastify/auth'), { defaultRelation: 'and'} ); 
fastify.decorate('verifyToken', verifyToken);
fastify.register(authJwt);
fastify.register(adminPanelRoutes);

function getToken() {
  let token = jwt.sign({ foo: 'bar' }, 'my_jwt_secret'); 

  return token;
}


(async () => {
  try {
    const knex = require("knex")(development);
    // REST
    fastify.get('/', async (req, reply) => {
      if ( [fastify.verifyToken] ) {
        reply
          .code(200)
          .send({ statusCode: 200, message: 'Valid token' })
      } else {
        reply
          .code(404)
          .send({ statusCode: 404, message: 'Invalid token' });
      }     
    })
    
    fastify.post("/login", async (req, res) => {
      let result = null;
      
      try {
        const { name, password } = req.body;

        result = await knex("users")
          .select("name", "password", "id", "role", "createdat")
          .where({ 'name': name, 'password': password });
        //console.log(result, 111)
        if (result.length === 0) {
          res
            .code(404)
            .send({ statusCode: 404, message: 'Invalid' });

          return fastify.log.error();
        } else {
          // sign a token          
          let token = await getToken();

          const readyResult = result[0];
          const readyResp = { 
            id: readyResult.id, 
            name: readyResult.name, 
            role: readyResult.role, 
            createdat: readyResult.createdat 
          }

          res
            .setCookie('token', token, {
              domain: '',
              path: '/',
              secure: true, // send cookie over HTTPS only
              httpOnly: true,
              sameSite: true // alternative CSRF protection
            })
            .code(200)
            .send({ statusCode: 200, message: 'Valid', result: readyResp })
        }
      } catch (err) {
        fastify.log.error(err);
      }
    });
    
    fastify.get('/verifycookie', (request, reply) => {
      reply.send({ code: 'OK', message: 'it works!' })
    })

    await fastify.listen({ port: 3001 }, (err) => { if (err) throw err });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();


      //const aCookieValue = req.cookies.cookieName;
      //const bCookie = req.unsignCookie(req.cookies.cookieSigned);

/*
    fastify.get('/cookies', async (request, reply) => {
      const token = await reply.jwtSign({
        name: 'foo',
        role: ['admin', 'spy']
      })
    
      reply
        .setCookie('token', token, {
          domain: 'your.domain',
          path: '/',
          secure: true, // send cookie over HTTPS only
          httpOnly: true,
          sameSite: true // alternative CSRF protection
        })
        .code(200)
        .send('Cookie sent')
    })*/
    
    //fastify.addHook('onRequest', (request) => [fastify.verifyToken])

      /*new Promise((resolve,reject) => {
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
  });*/