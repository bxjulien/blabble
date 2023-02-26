import { Button, TextInput } from 'react95';
import { CREATE_ROOM, POST_MESSAGE } from '../../../graphql/queries';
import { FormEvent, useRef } from 'react';

import Message from '../../../types/Message.interface';
import Room from '../../../types/Room.interface';
import { useAppContext } from '../../../context';
import { useMutation } from '@apollo/react-hooks';

interface ChatProps {
  roomId: string;
}

interface PostMessageResult {
  postMessage: Message;
}

export const Chat = ({ roomId }: ChatProps) => {
  const { user } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [postMessage, { loading, error, data }] = useMutation(POST_MESSAGE, {
    onCompleted: (data: PostMessageResult) => {
      console.log(data);
      inputRef.current && (inputRef.current.value = '');
    },
    onError: (error) => {
      console.error('POST_MESSAGE onError', error);
    },
  });

  const handlePostMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    postMessage({
      variables: {
        text: formData.get('message') as string,
        roomId,
        userId: user?.id,
      },
    });
  };

  return (
    <form
      className='chat'
      onSubmit={handlePostMessage}
      style={{
        height: '3rem',
        display: 'flex',
        gap: '.5rem',
      }}
    >
      <TextInput
        ref={inputRef}
        name='message'
        placeholder='Message...'
        fullWidth
      />
      <Button
        primary
        type='submit'
        disabled={loading}
        style={{ height: '100%' }}
      >
        Post
      </Button>
    </form>
  );
};
