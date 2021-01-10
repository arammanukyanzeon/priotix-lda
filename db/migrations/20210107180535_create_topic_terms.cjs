
exports.up = function (knex) {
    return knex.schema.createTable('topic_terms', function (t) {
        t.bigIncrements('id').primary();
        t.text('term').notNullable();
        t.decimal('probability', 8, 3);
        t.integer('topic_id');
        t.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
};

exports.down = function (knex) {
    return knex.schema.dropTabele('topic_terms');
};
