import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send, Time } from 'react-native-gifted-chat';
import { useMutation } from '@apollo/client';

import { SEND_MESSAGE } from '../queries';
import { Ionicons } from '@expo/vector-icons'; 

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

  const parsePatterns = () => {
    return [
      {
        type: 'url',
        style: { textDecorationLine: 'underline', color: 'darkorange', flexShrink: 1 },
      },
    ]
  }

  const renderBubble = (props: any) => {
    return (
      <Bubble 
        {...props} 
        wrapperStyle={{
          left: {
            backgroundColor: '#F7F7F8',
          },
          right: {
            backgroundColor: '#EDEEF7'
          }
        }} 
        textStyle={{
          left: {
            color: '#3E305D',
            fontFamily: 'BeVietnam_400Regular'
          },
          right: {
            color: '#3E305D',
            fontFamily: 'BeVietnam_400Regular'
          }
        }}
      />
    );
  }

  const renderTime = (props: Time['props']) => {
    return (
      <Time 
      {...props}
      timeTextStyle={{
        right: styles.timeText,
        left: styles.timeText
      }}
      />
    )
  }

  const renderInputToolbar = (props: InputToolbar['props']) => {
    return (
      <InputToolbar 
        {...props} 
        containerStyle={styles.inputToolbar}

      />
    );
  }
  
  const renderSend = (props: Send['props']) => (
    <Send {...props} containerStyle={styles.sendButton}>
      <Ionicons size={18} color={'white'} name={'ios-send'} />
    </Send>
  )


  return (
    <GiftedChat
      messages={refactorMessagesData(props.messages)}
      onSend={(message) => onSend(message)}
      user={{
        _id: props.currentUser.id,
        name: props.currentUser.firstName,
        avatar: props.currentUser.profilePic
      }}
      parsePatterns={parsePatterns}
      placeholder="Type your message..."
      alwaysShowSend={true}
      textInputStyle={styles.textInput}
      renderBubble={renderBubble}
      renderTime={renderTime}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
    />
  )
}

const styles = StyleSheet.create({
  timeText: {
    color: '#aaaaaa',
    fontFamily: 'BeVietnam_400Regular'
  },
  inputToolbar: {
    backgroundColor: '#F7F7F8',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 0,
    borderRadius: 50
  },
  textInput: {
    borderRadius: 50,
    paddingTop: 8,
    backgroundColor: '#F7F7F8',
    fontFamily: 'BeVietnam_400Regular'
  },
  sendButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 30,
    height: 30,
    padding: 7,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: '#5B61B9',
  }
});
