import './Join.css';

import { Window, WindowHeader } from 'react95';

import { LOGIN } from '../../../graphql/queries';
import { PinCodeForm } from './pin_code/PinCode';
import { UsernameForm } from './username/Username';
import { useAppContext } from '../../../context';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';

export const Join = () => {
  const { setUser } = useAppContext();

  const [username, setUsername] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');

  const [login, { loading, error, data }] = useMutation(LOGIN);

  const handleLogin = () => {
    login({
      variables: {
        name: username,
        pinCode,
      },
      onCompleted: (data) => {
        setUser(data.login);
      },
      onError: (error) => {
        console.error('LOGIN onError', error);
      },
    });
  };

  return (
    <Window
      style={{
        width: '100%',
      }}
    >
      <WindowHeader>
        <span>Connexion</span>
      </WindowHeader>
      {!username ? (
        <UsernameForm setUsername={setUsername} />
      ) : (
        <PinCodeForm
          username={username}
          setUsername={setUsername}
          pinCode={pinCode}
          setPinCode={setPinCode}
          handleLogin={handleLogin}
          loading={loading}
        />
      )}
    </Window>
  );
};
