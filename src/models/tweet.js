import fetch from 'node-fetch';

const address = process.env.TWITTER_SERVICE_ADDRESS;

const model = {
    async get(ids) {
        let data = [];

        try {
            const response = await fetch(`http://${address}/tweet/${ids.join(',')}`);
            data = await response.json();
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }

        return data;
    },
};

export default model;
