# TWG chat app

## Brief Description

An app for sending and receiving messages in rooms.

## Features

### General

- [x] The user has an access to their rooms
- [x] The user can send and receive (live) messages in rooms

### Main view

- [x] The user can see their rooms with title and picture (kind of easter egg for rooms without assigned picture :egg: )
- [x] Information when the user doesn't belong to any room

### Room view

- [x] navigation (to return to main screen)
- [x] room title
- [x] incoming messages include content, time, author name and profile pic (one more easter egg for users withour profile pic)
- [x] send messages include only content and time
- [x] form for sending messages (handling links, emojis)

### Further development

- [ ] login/register screens
- [ ] storing token in secureStorage
- [ ] theme toggle

### Prerequisites

The easiest way to run the app is to use [Expo](https://docs.expo.io/). Thanks to it you can check the app in a web browser or mobile device. 

### Installation

After cloning this repository, you have to install dependencies:

```
yarn install
```
Then create a .env file in your project root directory and insert there 3 variables (TOKEN, API_URL, WSS) with credentials.

Then you should run:

```
expo start
```
App should be running in your browser. Give it a try!

*Note: in case you have a problem with configuring connection with .env file you can make a workaround:*
in a file ApolloClient.tsx comment line 8 and add these 3 lines:
```
const TOKEN= *your token here*
const API_URL= *you api url here*
const WSS= *your websocket link here*
```
## Main tools

- [React Native](https://reactnative.dev/) mobile app fundament
- [React](https://reactjs.org/) React Native "parent"
- [TypeScript](https://www.typescriptlang.org/) for higher quality, static typed code
- [React Native Navigation](https://reactnavigation.org/) for navigation
- [Apollo GraphQL](https://www.apollographql.com/docs/) for consuming API and handling requests to backend
- [Absinthe](https://hexdocs.pm/absinthe/Absinthe.html) for establishing the websocket connection
- [GiftedChat](https://github.com/FaridSafi/react-native-gifted-chat) for easier messages UI creating
- [Expo](https://docs.expo.io/) for comfortable runing the app
