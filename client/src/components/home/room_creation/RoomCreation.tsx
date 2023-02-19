import { Button, TextInput } from 'react95';
import { FormEvent, useRef } from 'react';

import { CREATE_ROOM } from '../../../graphql/queries';
import Room from '../../../types/Room.interface';
import { useAppContext } from '../../../context';
import { useMutation } from '@apollo/react-hooks';

interface CreateRoomResult {
  createRoom: Room;
}

export const RoomCreation = () => {
  const { rooms, setRooms } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [createRoom, { loading, error, data }] = useMutation(CREATE_ROOM, {
    onCompleted: (data: CreateRoomResult) => {
      setRooms([data.createRoom, ...(rooms || [])]);
      inputRef.current && (inputRef.current.value = '');
    },
    onError: (error) => {
      console.error('CREATE_ROOM onError', error);
    },
  });

  const handleCreateRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    createRoom({
      variables: {
        name: formData.get('name') as string,
      },
    });
  };

  return (
    <form
      className='room_creation'
      onSubmit={handleCreateRoom}
      style={{
        height: '3rem',
        display: 'flex',
        gap: '.5rem',
      }}
    >
      <TextInput
        ref={inputRef}
        name='name'
        placeholder='Create a room...'
        fullWidth
      />
      <Button
        primary
        type='submit'
        disabled={loading}
        style={{ height: '100%' }}
      >
        Create
      </Button>
    </form>
  );
};
