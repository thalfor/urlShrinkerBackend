//
const { knex:setupKnex } = require('knex');
const config = require('../knexfile');
//
const knex = setupKnex(config);
//
module.exports = knex;
//