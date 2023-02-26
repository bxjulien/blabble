import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Frame } from 'react95';
import { Home } from './routes/home';
import { Navbar } from './components/navbar/Navbar';
import { Room } from './routes/room';
import { Settings } from './routes/settings';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/room/:id', element: <Room /> },
  { path: '/settings', element: <Settings /> },
]);

function App() {
  return (
    <div className='App'>
      <Frame
        style={{
          padding: '0.5rem',
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: 'auto 3rem',
          gridGap: '10px',
        }}
      >
        <RouterProvider router={router} />
        <Navbar />
      </Frame>
    </div>
  );
}

export default App;
