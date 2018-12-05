
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments('id')
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.timestamp('event_date').notNullable()

    table.integer('user_id').references('id').inTable('users').notNull().onDelete('cascade');    
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};
