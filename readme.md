# Push Server

This is a Node.js server that allows you to send push notifications to your users. It uses the Firebase Cloud Messaging (FCM) API to send notifications to Android and iOS devices.

## Installation

1. Clone the repository: `git clone https://github.com/Yousuf-Basir/push-server`
2. Install dependencies: `npm install`
3. Create a Firebase project and get your server key from the Firebase console.

## Usage

To start the server, run `npm run dev`. The server will listen on port 3000 by default.

### Sending a notification

To send a notification, make a POST request to `/push/send` with the following JSON payload:

```ts
{
    title: string;
    message: string;
    device_token: string;
    device_type: DeviceType;
    target_time?: string; // Date/time string in ISO 8601 format
    time_zone?: string; // e.g. Asia/Dhaka, America/Los_Angeles
}
```

The `target_time` and `time_zone` fields are optional. If they are not provided, the notification will be sent immediately.

### Bull UI Dashboard

The server uses [Bull](https://optimalbits.github.io/bull/) for queueing notifications. You can access the Bull UI dashboard at `/bull-ui`. 

