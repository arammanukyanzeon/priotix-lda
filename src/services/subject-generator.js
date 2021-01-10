import lda from 'lda';
import _ from 'lodash';
import moment from 'moment';

import { Topic, Tweet, Subject } from '../models/index.js';

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
    const ids = topics.map(topic => topic.id);
    const tweets = await Tweet.get(ids);
    const groupedTweets = _.groupBy(tweets, 'topic_id');
    _.map(groupedTweets, (tweets, topic_id) => {
        const topic = _.find(topics, (topic) => topic.id == topic_id);
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
    })
}