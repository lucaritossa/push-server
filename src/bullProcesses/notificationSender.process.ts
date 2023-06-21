import { Job } from 'bull';
import { NotificationPayload } from '../controllers/push.controller';
import { firebaseCloudMessaging } from '../index';

export const notificationSenderProcess = async (job: Job) => {
    try {
        const notificationPayload: NotificationPayload = job.data;

        // check if notificationPayload is valid
        if (!notificationPayload || !notificationPayload.title || !notificationPayload.device_token || !notificationPayload.message || !notificationPayload.device_type) {
            throw new Error('Invalid notification payload');
        }

        // send notification
        switch (notificationPayload.device_type) {
            case 'ANDROID':
                // send android notification
                firebaseCloudMessaging.send({
                    notification: {
                        title: notificationPayload.title,
                        body: notificationPayload.message,
                    },
                    token: notificationPayload.device_token,
                }).then((response) => {
                    // resolve bull process if successful
                    job.progress(100);
                    job.moveToCompleted('success', true);

                }).catch((error) => {
                    // reject bull process if failed
                    job.progress(100);
                    job.moveToFailed(error, true);
                });
                break;
            case 'IOS':
                // send ios notification
                break;
            default:
                throw new Error('Invalid device type');
        }

        return job;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
