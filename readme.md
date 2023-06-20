# Push Server

This is a Node.js server that allows you to send push notifications to your users. It uses the Firebase Cloud Messaging (FCM) API to send notifications to Android and iOS devices.

## Installation

1. Clone the repository: `git clone https://github.com/Yousuf-Basir/push-server`
2. Install dependencies: `npm install`
3. Create a Firebase project and get your server key from the Firebase console.
4. Rename `.env.example` to `.env` and add your Firebase server key to the `FCM_SERVER_KEY` variable.

## Usage

To start the server, run `npm run dev`. The server will listen on port 3000 by default.

### Sending a notification

To send a notification, make a POST request to `/send` with the following JSON payload:
