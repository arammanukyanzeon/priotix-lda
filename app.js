import { scheduleJob } from 'node-schedule';
import { getTopicWords } from './src/lda/services/lda.service.js'

class Server {
    constructor() {
        this.initJobs();
    }

    initJobs() {
        scheduleJob('*/1 * * * *', () => {
            getTopicWords();
        })
    }
}
getTopicWords();
new Server();