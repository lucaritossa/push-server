# Push Server

This is a Node.js server that allows you to send push notifications to your users. It uses the Firebase Cloud Messaging (FCM) API to send notifications to Android and iOS devices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Sending a Notification](#sending-a-notification)
  - [Bull UI Dashboard](#bull-ui-dashboard)

## Installation

1. Clone the repository: `git clone https://github.com/Yousuf-Basir/push-server`
2. Install dependencies: `npm install`
3. Create a Firebase project and get your server key from the Firebase console.

## Usage

### Starting the Server

To start the server, run the following command. The server will listen on port 3000 by default.

```bash
npm run dev
```

### Sending a Notification

To send a notification, make a POST request to `/push/send` with the following JSON payload:

```json
{
    "title": "Notification Title",
    "message": "Notification Message",
    "device_token": "device_token_here",
    "device_type": "android",
    "target_time": "2023-08-31T10:00:00Z",
    "time_zone": "Asia/Dhaka"
}
```

The `target_time` and `time_zone` fields are optional. If they are not provided, the notification will be sent immediately.

### Bull UI Dashboard

The server uses [Bull](https://optimalbits.github.io/bull/) for queueing notifications. You can access the Bull UI dashboard at `/bull-ui`.

## Contributing

Contributions are welcome! If you find any issues or want to enhance this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.