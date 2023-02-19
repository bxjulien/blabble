import './Join.css';

import { Window, WindowHeader } from 'react95';

import { PinCodeForm } from './pin_code/PinCode';
import { UsernameForm } from './username/Username';
import { useState } from 'react';

export const Join = () => {
  const [username, setUsername] = useState<string>('');
  const [pin, setPin] = useState<string>('');

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
          pin={pin}
          setPin={setPin}
        />
      )}
    </Window>
  );
};
