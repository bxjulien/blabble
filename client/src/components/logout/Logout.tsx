import { Button } from 'react95';
import { useAppContext } from '../../context';

export const Logout = () => {
  const { setUser } = useAppContext();

  const disconnect = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Button
      style={{
        display: 'flex',
        gap: '10px',
      }}
      onClick={disconnect}
    >
      Disconnect
      <img
        src='/src/assets/cross.png'
        alt='cross'
        style={{
          width: '20px',
          height: '20px',
        }}
      />
    </Button>
  );
};
