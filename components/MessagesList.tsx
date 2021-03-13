import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

const MessageItem = ({ message }) => {
  const { id, body, user, insertedAt } = message;

  return (
      <Text>{user.firstName}: {body}</Text>
  );
}

const MessagesList = (props) => {
  
  React.useEffect(() => {
    console.log('Loading new messages...');
    props.subscribeToNewMessages();
  });

  return <View>
      <FlatList
        data={props.messages}
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