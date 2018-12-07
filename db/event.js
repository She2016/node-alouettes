const knex = require('./connection');

module.exports = {
  getOne: function (id) {
    return knex('events').where('id', id).first();
  },
  getOneByDate : function(date) {
    return knex('events').where('event_date', date).first()
  },  
  getAllEvents: function() {
    return knex.select().table('events')
  },
  create: function(event) {
    return knex('events').insert(event, 'id').then(ids => {
      return ids[0]
    })
  },
  edit: function (id, event) {
    return knex('events').where('id', id)
    .update(event)
  },
  delete(id) {
    return knex('events').where('id', id).del();
  }
}
