import { RoomCreation } from '../components/views/home/room_creation/RoomCreation';
import { Rooms } from '../components/views/home/rooms/Rooms';

export const Home = () => {
  return (
    <div className='home_view'>
      <h1 className='title'>Blabble</h1>
      <RoomCreation />
      <Rooms />
    </div>
  );
};
