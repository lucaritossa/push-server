import { Job } from 'bull';

export const notificationSenderProcess = async (job: Job) => {
    try {
        console.log(job.id);
        // fake delay of 8 seconds to simulate a long running process
        await new Promise((resolve) => setTimeout(resolve, 8000));
        console.log('done');

        return job.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
