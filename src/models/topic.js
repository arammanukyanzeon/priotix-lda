import fetch from 'node-fetch';

const address = process.env.TWITTER_SERVICE_ADDRESS;

const model = {
    async getActive() {
        let data = [];

        try {
            const response = await fetch(`http://${address}/topic/`);
            data = await response.json();
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        
        return data;
    },
};

export default model;
