import { Response } from 'express';

export const sampleView = (res: Response) => {
  res.send(`
    <h1>catch me if you can</h1>
    <button>click me</button>
  `);
};
