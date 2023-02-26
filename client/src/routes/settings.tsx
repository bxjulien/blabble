import { Login } from '../components/login/Login';
import { Logout } from '../components/logout/Logout';
import { useAppContext } from '../context';

export const Settings = () => {
  const { user } = useAppContext();

  if (!user) return <Login />;
  return (
    <div className='setting_view'>
      <h1>{user.name}</h1>
      <Logout />
    </div>
  );
};
