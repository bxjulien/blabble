import { Button, TextInput } from 'react95';
import { FormEvent, useRef } from 'react';

import { useState } from 'react';

interface UsernameFormProps {
  setUsername: (username: string) => void;
}

export const UsernameForm = ({ setUsername }: UsernameFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleUsernameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    setUsername(formData.get('username') as string);
  };

  return (
    <form
      onSubmit={handleUsernameSubmit}
      style={{
        padding: '.5rem',
        display: 'flex',
        gap: '.5rem',
      }}
    >
      <TextInput
        ref={inputRef}
        name='username'
        placeholder='Join as...'
        fullWidth
        onChange={(e) => {
          const isValueOverThan15Characters = e.target.value.length > 15;

          if (isValueOverThan15Characters) {
            e.target.value = e.target.value.slice(0, 15);
            return;
          }

          setIsDisabled(e.target.value.length < 3);
        }}
      />
      <Button primary type='submit' disabled={isDisabled}>
        Next
      </Button>
    </form>
  );
};
