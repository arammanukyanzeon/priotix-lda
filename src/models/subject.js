import knex from "../../db/db.js";
import moment from "moment";

const tableName = 'topic_terms';

const model = {
    async upsert(data, topicID, day) {
        const [topic] = await this.getByTopic(topicID);

        if (topic) {
            console.log("updating to ", data, topicID, day);
            await knex(tableName)
            .update({
                term: data.term,
                probability: data.probability,
            })
            .where('topic_id', topicID)
            .whereRaw(`date(created_at) = '${day}'`);
        } else {
            const date = moment(day).utc().format()
            await knex(tableName)
                .insert({
                    term: data.term,
                    probability: data.probability,
                    topic_id: topicID,
                    created_at: date
                })
                .returning("*");
        }
    },

    async getByTopic(topicID) {
        return await knex(tableName)
            .where('topic_id', topicID);
    },
};

export default model;