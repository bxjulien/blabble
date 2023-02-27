import { Button, GroupBox, TextInput } from 'react95';
import { FormEvent, useEffect, useRef } from 'react';

interface PinCodeFormProps {
  username: string;
  setUsername: (username: string) => void;
  pinCode: string;
  setPinCode: (pin: string) => void;
  handleLogin: () => void;
  loading: boolean;
  error: any;
}

export const PinCodeForm = ({
  username,
  setUsername,
  pinCode,
  setPinCode,
  handleLogin,
  loading,
  error,
}: PinCodeFormProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLInputElement>(null);
  const fourthInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (error) {
      if (
        firstInputRef.current &&
        secondInputRef.current &&
        thirdInputRef.current &&
        fourthInputRef.current
      ) {
        console.error('PinCodeForm error', error);
        firstInputRef.current.value = '';
        secondInputRef.current.value = '';
        thirdInputRef.current.value = '';
        fourthInputRef.current.value = '';
        firstInputRef.current.focus();
      }
    }
  }, [error]);

  const handleInputChange = (currentRef: any, nextRef: any, value: any) => {
    const isValueANumberBetween0And9 = value >= 0 && value <= 9;

    if (!isValueANumberBetween0And9) {
      currentRef.current.value = '';
      return;
    }

    if (value.length === 1 && nextRef?.current) {
      nextRef.current.focus();
    } else if (value.length === 0 && currentRef.current) {
      currentRef.current.focus();
    }

    setPinCode(
      `${firstInputRef.current?.value || ''}${
        secondInputRef.current?.value || ''
      }${thirdInputRef.current?.value || ''}${
        fourthInputRef.current?.value || ''
      }`
    );
  };

  return (
    <form
      style={{
        padding: '.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <GroupBox label='Pin Code'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '.5rem',
          }}
        >
          <TextInput
            ref={firstInputRef}
            style={{ width: '2rem' }}
            onChange={(e) =>
              handleInputChange(firstInputRef, secondInputRef, e.target.value)
            }
          />
          <TextInput
            ref={secondInputRef}
            style={{ width: '2rem' }}
            onChange={(e) =>
              handleInputChange(secondInputRef, thirdInputRef, e.target.value)
            }
          />
          <TextInput
            ref={thirdInputRef}
            style={{ width: '2rem' }}
            onChange={(e) =>
              handleInputChange(thirdInputRef, fourthInputRef, e.target.value)
            }
          />
          <TextInput
            ref={fourthInputRef}
            style={{ width: '2rem' }}
            onChange={(e) =>
              handleInputChange(fourthInputRef, null, e.target.value)
            }
          />
        </div>
      </GroupBox>

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '.5rem',
        }}
      >
        <Button primary type='submit' disabled={pinCode.length < 4 || loading}>
          Connect as '{username}'
        </Button>
        <Button
          onClick={() => {
            setUsername('');
          }}
          type='button'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
