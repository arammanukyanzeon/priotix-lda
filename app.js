import express from 'express';
import bodyParser from 'body-parser';
import { scheduleJob } from 'node-schedule';
import dotenv from 'dotenv';

import { getTopicWords } from './src/services/subject-generator.js';
import subjectRoutes from './src/routes/subject.js';

dotenv.config();
const port = process.env.PORT;

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

