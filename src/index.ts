import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import sampleRouter from './routes/push.route';
import * as admin from 'firebase-admin';
const serviceAccount = require('./firebase/fcm_service_account.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
