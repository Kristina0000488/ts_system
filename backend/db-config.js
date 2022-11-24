const knex = require('knex');
const config = require('./knexfile.js');

const db = require(config.development);

// it isn't using now. old code
module.exports = {
    find
};

function find() {
    return db('users');
}