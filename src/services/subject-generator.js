import lda from 'lda';
import _ from 'lodash';
import moment from 'moment';

import { Topic, Tweet, Subject, TopicLastId } from '../models/index.js';
import { cleanText } from '../utils.js';

export async function getTopicWords() {
    const topics = await Topic.getActive();
    if (!topics.length) return;

    for(let topic of topics) {
        const [topicLast = {}] = await TopicLastId.getByTopic(topic.id);
        const tweets = await Tweet.get(topic.id, topicLast.last_id || 0);
        if (!tweets.length) {
            console.log(`No new tweets for topic '${topic.name}'. continuing...`);
            continue;
        }
        const lastTweet = _.maxBy(tweets, (tweet) => tweet.id);
        await TopicLastId.upsert(lastTweet.id, topic.id)
        const tweetsByDate = _.groupBy(tweets, (tweet) => moment(tweet.created_at).format("YYYY-MM-DD"));

        _.map(tweetsByDate, (tweets, day) => {
            const cleanTweets = tweets.map(gt => cleanText(gt.text, topic.name));
            const results = lda(cleanTweets, 2, 2);
            console.log(results);
            results.forEach(result => {
                const data = {
                    probability: 0,
                };
                
                data.term = result.map(r => r.term).join(' ');
                result.forEach(r => data.probability += r.probability);
    
                Subject.upsert(data, topic.id, day);
                console.log(`New subject '${data.term}' generated for topic '${topic.name}'`);
            })
        });
    }
}