import lda from 'lda';
import _ from 'lodash';
import moment from 'moment';

import { Topic, Tweet, Subject, TopicLastID } from '../models/index.js';

function cleanText(text, topic) {
    const regExps = [
        new RegExp(`#?${topic}`, "gi"),
        /https?:\/\/[\n\S]+/g,
        /RT @[^:]+:/gi,
        / @[^ ]+/g,
        /^@[^ ]+ /g,
    ];
    const oldText = text;

    regExps.forEach((regExp) => {
        text = text.replace(regExp, '');
    });
    return text;
}

export async function getTopicWords() {
    const topics = await Topic.getActive();
    if (!topics.length) return;

    for(let topic of topics) {
        const [topicLast = {}] = TopicLastID.getByTopic(topic.id);
        const tweets = await Tweet.get(topic.id, topicLast.last_id);
        if (!tweets.length) continue;
        const lastTweet = _.maxBy(tweets, (tweet) => tweet.id);
        TopicLastID.upsert(lastTweet.id, topic.id)
        
        const tweetsByDate = _.groupBy(tweets, (tweet) => moment(tweet.created_at).format("YYYY-MM-DD"));

        _.map(tweetsByDate, (tweets, day) => {
            const cleanTweets = tweets.map(gt => cleanText(gt.text, topic.name));
            const results = lda(cleanTweets, 2, 2);

            const date = moment(day).utc().format()
            results.forEach(result => {
                const data = {
                    probability: 0,
                };
                
                data.term = result.map(r => r.term).join(' ');
                result.forEach(r => data.probability += r.probability);
    
                Subject.add(data, topic.id, date);
            })
        });
    }
}