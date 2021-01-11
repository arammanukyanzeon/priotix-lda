import fetch from 'node-fetch';

const model = {
    async get(id, lastId = '') {
        let data = [];

        try {
            const response = await fetch(`http://${process.env.TWITTER_SERVICE_ADDRESS}/tweet/${id}/${lastId}`);
            data = await response.json();
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }

        return data;
    },
};

export default model;
