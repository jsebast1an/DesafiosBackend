const knex = require('knex')
const options = require('./config.js')

const database = knex(options);

database.schema.createTable('products', table => {
    table.increments('id')
    table.string('name', 20)
    table.integer('price')
    table.string('thumbnail')
})
