import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Keyboard } from 'react-native';
import { useMutation } from '@apollo/client';

import { SEND_MESSAGE } from '../queries';

export default ({ roomId }: { roomId: string }) => {
  const [text, setText] = React.useState('');
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);

  const onSubmit = () => {
    console.log(text);
    sendMessage({ variables: { body: text, roomId: roomId } });;
    setText('');
  };

  return (
    <View>
      <TextInput
        style={{height: 40}}
        onChangeText={text => setText(text)}
        onBlur={Keyboard.dismiss}
        placeholder="Type your message"
        value={text}
      />

      <View>
        <Button
          title="Send"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};
