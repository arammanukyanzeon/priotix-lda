import fetch from 'node-fetch';

const model = {
    async getActive() {
        const response = await fetch('http://localhost:8080/topic/');
        const data = await response.json();
        
        return data;
    },
};

export default model;
