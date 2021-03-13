import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useMutation } from '@apollo/client';

import { SEND_MESSAGE } from '../queries';

export const Chat = (props) => {
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE)

  useEffect(() => {
    console.log('Loading new messages...');
    props.subscribeToNewMessages();
  });


  const refactorMessagesData = (messages) => {
    const refactoredMessages = messages.map(message => {
      const author = message.user;

      return {
        _id: message.id,
        text: message.body,
        createdAt: new Date(message.insertedAt),
        user: {
          _id: author.id,
          name: author.firstName,
          avatar: author.profilePic,
        }
      }
    });
    return refactoredMessages.reverse();
  }

  const onSend = (messages) => {
    const message = messages[0];
    sendMessage({ variables: { body: message.text, roomId: props.roomId } });
  }; 

  return (
    <GiftedChat
      messages={refactorMessagesData(props.messages)}
      onSend={(message) => onSend(message)}
      user={{
        _id: props.currentUser.id,
        name: props.currentUser.firstName,
        avatar: props.currentUser.profilePic
      }}
    />
  )
}
