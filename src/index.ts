import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import sampleRouter from './routes/sample.model';
import { sampleController } from './controllers/sample.controller';
import { sampleView } from './views/sample.view';
import Bull from 'bull'
import { notificationSenderProcess } from './bullProcesses/notificationSender.process';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// notification queue
export const notificationQueue = new Bull('notification');
notificationQueue.process(notificationSenderProcess)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', sampleRouter);

app.get('/controller', sampleController);
app.get('/view', (_, res) => sampleView(res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
