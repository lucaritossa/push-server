import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import sampleRouter from './routes/push.route';
import Bull from 'bull'
import { notificationSenderProcess } from './bullProcesses/notificationSender.process';
import * as admin from 'firebase-admin';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const serviceAccount = require('./firebase/fast-falcon-eec4a-firebase-adminsdk-nftgt-486ffc3c8b.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/bull-ui');

// notification queue
export const notificationQueue = new Bull('notification');
notificationQueue.process(notificationSenderProcess)

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(notificationQueue)],
  serverAdapter: serverAdapter,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseCloudMessaging = admin.messaging();

app.get('/', (req, res) => {
  res.send('Welcome to push server');
});

app.use('/push', sampleRouter);

app.use('/bull-ui', serverAdapter.getRouter());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
