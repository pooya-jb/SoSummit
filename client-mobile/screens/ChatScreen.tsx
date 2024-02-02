import { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);

  const onSend = useCallback((newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  }, []);

  function handleTapOutside() {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          placeholder='Send us any other information:'
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
});
