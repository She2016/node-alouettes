exports.up = function (knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments('id')
    table.string('title').notNullable()
    table.string('message').notNullable()
    table.timestamp('message_time').notNullable();
    table.integer('sender_id').unsigned().index().references('id').inTable('users')

    table.timestamp('created_at', 6).defaultTo(knex.fn.now(6));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('messages')
};