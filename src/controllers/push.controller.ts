import { Request, Response } from 'express';
import { notificationQueue } from '../index';
import { DateTime } from 'luxon';

export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export type NotificationPayload = {
  title: string;
  message: string;
  device_token: string;
  device_type: DeviceType;
  target_time?: string; // Date/time string in ISO 8601 format
  time_zone?: string; // e.g. Asia/Dhaka, America/Los_Angeles
}

export const pushController = async (req: Request, res: Response) => {
  try {
    const requestBody: NotificationPayload = req.body;

    // Calculate delay in milliseconds based on the target_time and time_zone
    let delay = 0;
    if (requestBody.target_time && requestBody.time_zone) {

      const targetTime = DateTime.fromFormat(requestBody.target_time, 'dd-MM-yyyy hh:mma', { zone: requestBody.time_zone });
      const currentTime = DateTime.utc();

      // validate target time if it is valid
      if(targetTime.isValid === false) {
        return res.status(400).send({
          error: 'Invalid target time. Please use the format dd-MM-yyyy hh:mma e.g. 21-06-2023 05:12PM',
        });
      }
      // validate target time if it is in the future
      if (targetTime.diff(currentTime).as('milliseconds') <= 0) {
        return res.status(400).send({
          error: 'Target time must be in the future',
        });
      }

      delay = targetTime.diff(currentTime).as('milliseconds');
    }

    // Add notification to the queue with delay
    const queue = await notificationQueue.add(requestBody, {
      delay, // Add delay in milliseconds
    });

    return res.send(`Notification added to queue with id: ${queue.id}`);
  } catch (error) {
    return res.status(500).send({
      error: `pushController error: ${error}`,
    });
  }
};
