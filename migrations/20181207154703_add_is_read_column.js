exports.up = function (knex, Promise) {
  return knex.schema.table('messages', function (t) {
    t.boolean('is_read').notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('messages', function (t) {
    t.dropColumn('is_read');
  });
};