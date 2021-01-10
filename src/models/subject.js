import knex from "../../db/db.js";

const tableName = 'topic_terms';

const model = {
    async add(data, topicID, date) {
        await knex(tableName)
            .insert({
                term: data.term,
                probability: data.probability,
                topic_id: topicID,
                created_at: date
            })
            .returning("*");
    },

    async getByTopic(topicID) {
        return await knex(tableName)
            .where('topic_id', topicID);
    },
};

export default model;