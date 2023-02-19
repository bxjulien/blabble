import { MESSAGES, MESSAGE_CREATED } from '../../../graphql/queries';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Message from '../../../types/Message.interface';

interface MessagesProps {
  messages: Message[];
  loading: boolean;
  error: any;
}

export const Messages = ({ messages, loading, error }: MessagesProps) => {
  const { data: newData } = useSubscription(MESSAGE_CREATED);

  if (loading) return <p>Loading messages...</p>;
  else if (error) return <p>Error :(</p>;
  else
    return (
      <MessageList
        messages={newData ? [newData.messageCreated, ...messages] : messages}
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
      <ul>
        {messages.map((message: any) => (
          <li key={message.id}>
            <p>
              {message.user.name} _ "{message.text}"
            </p>
          </li>
        ))}
      </ul>
    );
};
