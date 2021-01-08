import knex from "../../../db/db.js"

export async function getActiveTopic() {
    const data = await knex("topics")
        .select(['id', 'name'])
        .where('deleted', false);

    return data;
}

export async function getTweets(ids) {
    const data = await knex("tweets")
        .whereIn('topic_id', ids)
    let tweets = [];
    data.map(d => tweets.push(d))
    return tweets;
}

export async function addTopicTerms(data, topicID, date) {
    await knex("topic_terms")
        .insert({
            term: data.term,
            probability: data.probability,
            topic_id: topicID,
            created_at: date
        })
        .returning("*");
}