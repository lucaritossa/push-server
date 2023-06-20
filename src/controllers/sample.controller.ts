import { Request, Response } from 'express';

export const sampleController = (req: Request, res: Response) => {
  res.send('Hello, World from the controller!');
};
