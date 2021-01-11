import fetch from 'node-fetch';

const model = {
    async getActive() {
        let data = [];

        try {
            const response = await fetch(`http://${process.env.TWITTER_SERVICE_ADDRESS}/topic/`);
            data = await response.json();
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        
        return data;
    },
};

export default model;
