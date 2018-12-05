
exports.up = function(knex, Promise) {
  return knex.schema.createTable('information', table => {
    table.increments('id')
    table.string('title').notNullable()
    table.string('description').notNullable()

    table.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('information')
};
