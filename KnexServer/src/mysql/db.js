const knex = require('knex')
const options = require('./config.js')

const database = knex(options);

module.exports = database;