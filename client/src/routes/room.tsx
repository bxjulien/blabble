import { useParams } from 'react-router-dom';

export const Room = () => {
  let { id } = useParams<{ id: string }>();

  return (
    <div className='room_view'>
      <h1>Room</h1>
      <p>{id}</p>
    </div>
  );
};
