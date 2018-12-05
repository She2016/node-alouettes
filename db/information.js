const knex = require('./connection');

module.exports = {
  getOne: function (id) {
    return knex('information').where('id', id).first();
  },
  getOneByDate : function(date) {
    return knex('information').where('email', date).first()
  },  
  getAllInformation: function() {
    return knex.select().table('information')
  },
  create: function(event) {
    return knex('information').insert(event, 'id').then(ids => {
      return ids[0]
    })
  },
  edit: function (id, event) {
    return knex('information').where('id', id)
    .update(event)
  },
  delete(id) {
    return knex('information').where('id', id).del();
  }
}
