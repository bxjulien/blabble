import { Join } from '../components/home/join/Join';
import { RoomCreation } from '../components/home/room_creation/RoomCreation';
import { Rooms } from '../components/home/rooms/Rooms';
import { useAppContext } from '../context';

export const Home = () => {
  const { user } = useAppContext();

  return (
    <div className='home_view'>
      <h1
        style={{
          fontSize: '1.5rem',
          textAlign: 'center',
        }}
      >
        Blabble
      </h1>
      {user ? <RoomCreation /> : <Join />}
      <Rooms />
    </div>
  );
};
