import './App.css';

import { Frame } from 'react95';
import { RoomCreation } from './components/room/creation/RoomCreation';
import { Rooms } from './components/rooms/Rooms';

function App() {
  return (
    <div className='App'>
      <Frame style={{ padding: '0.5rem', width: '100%', height: '100%' }}>
        <h1 className='title'>Blabble</h1>
        <RoomCreation />
        <Rooms />
      </Frame>
    </div>
  );
}

export default App;
