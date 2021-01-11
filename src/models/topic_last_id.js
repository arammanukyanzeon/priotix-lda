import knex from "../../db/db.js";

const tableName = 'topic_last_ids';

const model = {
    async upsert(id, topicID) {
        const [topic] = await this.getByTopic(topicID);

        if (topic) {
            await knex(tableName)
            .update({
                last_id: id
            })
            .where('topic_id', topicID);
        } else {
            await knex(tableName)
            .insert({
                topic_id: topicID,
                last_id: id
            })
            .returning("*");
        }
    },

    async getByTopic(topicID) {
        return await knex(tableName)
            .where('topic_id', topicID)
            .limit(1);
    },
};

export default model;