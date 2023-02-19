import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Frame } from 'react95';
import { Home } from './routes/home';
import { Room } from './routes/room';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/room/:id', element: <Room /> },
]);

function App() {
  return (
    <div className='App'>
      <Frame style={{ padding: '0.5rem', width: '100%', height: '100%' }}>
        <RouterProvider router={router} />
      </Frame>
    </div>
  );
}

export default App;
