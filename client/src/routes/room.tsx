import { Button, Window, WindowHeader } from 'react95';
import { useNavigate, useParams } from 'react-router-dom';

import { Messages } from '../components/room/messages/Messages';
import { ROOM } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

export const Room = () => {
  let { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(ROOM, {
    variables: { id },
  });

  return (
    <Window
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <WindowHeader>
        <h1>{data?.room.name}</h1>
        <Button
          onClick={() => {
            navigate('/');
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <strong>X</strong>
        </Button>
      </WindowHeader>

      <h2>user list</h2>

      <Messages
        messages={data?.room.messages}
        loading={loading}
        error={error}
      />
    </Window>
  );
};
