# Push Server

This is a Node.js server that allows you to send push notifications to your users. It uses the Firebase Cloud Messaging (FCM) API to send notifications to Android and iOS devices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Sending a Notification](#sending-a-notification)

## Installation

1. Clone the repository: `git clone https://github.com/lucaritossa/push-server.git`
2. Install dependencies: `npm install`
3. Create a Firebase project and get your server key from the Firebase console. Replace the content of `/firebase/fcm_service_account.json`

## Usage

### Starting the Server

To start the server, run the following command. The server will listen on port 3000 by default.

```bash
npm run dev
```

### Sending a Notification

To send a notification, make a POST request to `/push/send`. The JSON you have to send is the entire JSON content expected by FCM.

## Contributing

Contributions are welcome! If you find any issues or want to enhance this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.