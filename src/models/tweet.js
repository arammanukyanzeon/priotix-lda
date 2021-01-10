import fetch from 'node-fetch';

const model = {
    async get(ids) {
        const response = await fetch('http://localhost:8080/tweet/' + ids.join(','));
        const data = await response.json();

        return data;
    },
};

export default model;
