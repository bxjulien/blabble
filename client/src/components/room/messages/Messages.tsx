import { GroupBox, ScrollView } from 'react95';
import { useEffect, useState } from 'react';

import { MESSAGE_CREATED } from '../../../graphql/queries';
import Message from '../../../types/Message.interface';
import { howLongAgo } from '../../../utils/functions';
import { useSubscription } from '@apollo/react-hooks';

interface MessagesProps {
  roomId: string;
  messagesAtLoad: Message[];
  loading: boolean;
  error: any;
}

export const Messages = ({
  roomId,
  messagesAtLoad,
  loading,
  error,
}: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messagesAtLoad) setMessages(messagesAtLoad);
  }, [messagesAtLoad]);

  useSubscription(MESSAGE_CREATED, {
    variables: { roomId },
    onData: (data) => {
      const newMessage = data.data.data.messageCreated;
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
    },
    onError: (error) => {
      console.error('MESSAGE_CREATED onError', error);
    },
  });

  if (loading) return <p>Loading messages...</p>;
  else if (error) return <p>Error :(</p>;
  else return <MessageList messages={messages} />;
};

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <ScrollView
      style={{
        height: '100%',
        maxHeight: '60vh',
        width: '100%',
        padding: '10px',
      }}
    >
      {!messages || !messages.length ? (
        <div
          style={{
            textAlign: 'center',
            color: 'gray',
          }}
        >
          No messages yet
        </div>
      ) : (
        messages.map((message: any) => (
          <GroupBox
            key={message.id}
            label={
              <div>
                {message.user.name} -{' '}
                <small
                  style={{
                    color: 'gray',
                  }}
                >
                  {howLongAgo(+message.createdAt)}
                </small>
              </div>
            }
            style={{
              margin: '1.5rem 0',
            }}
          >
            {message.text}
          </GroupBox>
        ))
      )}
    </ScrollView>
  );
};
