import { Messages } from '../components/room/messages/Messages';
import { ROOM } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

export const Room = () => {
  let { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(ROOM, {
    variables: { id },
    onCompleted: (data) => {
      console.log('Room data:', data.room);
    },
  });

  return (
    <div className='room_view'>
      <h1>{data?.room.name}</h1>
      <Messages
        messages={data?.room.messages}
        loading={loading}
        error={error}
      />
    </div>
  );
};
