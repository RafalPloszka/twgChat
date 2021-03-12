import * as React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

const MessageItem = ({ message }) => {
  const { id, body, user, insertedAt } = message;

  return (
      <Text>{user.firstName}: {body}</Text>
  );
}

const MessagesList = ({ messages }) => {

  return <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
}

export default MessagesList;