import { GroupBox, ScrollView } from "react95";
import { MESSAGES, MESSAGE_CREATED } from "../../../graphql/queries";
import { useQuery, useSubscription } from "@apollo/react-hooks";

import Message from "../../../types/Message.interface";
import { howLongAgo } from "../../../utils/functions";
import { useEffect, useState } from "react";

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
  useSubscription(MESSAGE_CREATED, {
    variables: { roomId },
    onData: (data) => {
      const newMessage = data.data.data.messageCreated;
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
    },
    onError: (error) => {
      console.error("MESSAGE_CREATED onError", error);
    },
  });

  console.log("Messages", messagesAtLoad);
  const [messages, setMessages] = useState<Message[]>(messagesAtLoad);

  if (loading) return <p>Loading messages...</p>;
  else if (error) return <p>Error :(</p>;
  else return <MessageList messages={messages} />;
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
          height: "500px",
          width: "100%",
          padding: "10px",
        }}
      >
        {messages.map((message: any) => (
          <GroupBox
            key={message.id}
            label={
              <div>
                {message.user.name} -{" "}
                <small
                  style={{
                    color: "gray",
                  }}
                >
                  {howLongAgo(+message.createdAt)}
                </small>
              </div>
            }
            style={{
              margin: "1.5rem 0",
            }}
          >
            {message.text}
          </GroupBox>
        ))}
      </ScrollView>
    );
};
