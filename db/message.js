const knex = require('./connection');

module.exports = {
  getOne: function (id) {
    return knex('messages').where('id', id).first();
  },
  getOneByDate : function(date) {
    return knex('messages').where('message_time', date).first()
  },  
  getAllMessages: function() {
    return knex.select().table('messages')
  },
  create: function(event) {
    return knex('messages').insert(event, 'id').then(ids => {
      return ids[0]
    })
  },
  edit: function (id, event) {
    return knex('messages').where('id', id)
    .update(event)
  },
  delete(id) {
    return knex('messages').where('id', id).del();
  }
}
