import { Request, Response } from 'express';
import { notificationQueue } from '../index';

export const sampleController = async (req: Request, res: Response) => {
  try {
    await notificationQueue.add({
      message: 'Hello, World!',
    })
    res.send('Hello, World!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
