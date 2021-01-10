

import express from 'express';
import bodyParser from 'body-parser';
import { scheduleJob } from 'node-schedule';
import { getTopicWords } from './src/services/subject-generator.js';
import Topic from './src/models/topic.js';

import subjectRoutes from './src/routes/subject.js';

const port = 8081;

class Server {
    constructor() {
        this.initJobs();
        this.app = express();
        this.config();
    }

    initJobs() {
        scheduleJob('*/1 * * * *', () => {
            getTopicWords();
        });
        Topic.getActive();
    }

    config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`)
        });

        this.app.use('/subject', subjectRoutes);

    }
}

let server = new Server();
export default server.app;

