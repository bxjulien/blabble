import { GroupBox, ScrollView } from 'react95';
import { MESSAGES, MESSAGE_CREATED } from '../../../graphql/queries';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Message from '../../../types/Message.interface';
import { howLongAgo } from '../../../utils/functions';
import { useEffect } from 'react';

interface MessagesProps {
  roomId: string;
  messages: Message[];
  loading: boolean;
  error: any;
}

export const Messages = ({
  roomId,
  messages,
  loading,
  error,
}: MessagesProps) => {
  const { data: newData } = useSubscription(MESSAGE_CREATED, {
    variables: { roomId },
    onData: (data) => {
      console.log('MESSAGE_CREATED onData', data);
    },
    onComplete: () => {
      console.log('MESSAGE_CREATED onComplete');
    },
    onError: (error) => {
      console.error('MESSAGE_CREATED onError', error);
    },
  });

  if (loading) return <p>Loading messages...</p>;
  else if (error) return <p>Error :(</p>;
  else
    return (
      <MessageList
        messages={newData ? [...messages, newData.messageCreated] : messages}
      />
    );
};

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  if (!messages || !messages.length) return <p>No messages</p>;
  else
    return (
      <ScrollView
        style={{
          height: '500px',
          width: '100%',
          padding: '10px',
        }}
      >
        {messages.map((message: any) => (
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
        ))}
      </ScrollView>
    );
};
