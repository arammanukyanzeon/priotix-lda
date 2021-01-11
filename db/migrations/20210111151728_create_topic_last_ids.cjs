
exports.up = function (knex) {
    return knex.schema.createTable('topic_last_ids', function (t) {
        t.bigIncrements('id').primary();
        t.integer('topic_id').notNullable();
        t.integer('last_id');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTabele('topic_last_ids');
};
