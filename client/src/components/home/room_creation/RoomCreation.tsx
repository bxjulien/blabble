import { Button, TextInput } from "react95";
import { FormEvent, useRef } from "react";

import { CREATE_ROOM } from "../../../graphql/queries";
import Room from "../../../types/Room.interface";
import { useAppContext } from "../../../context";
import { useMutation } from "@apollo/react-hooks";

interface CreateRoomResult {
  createRoom: Room;
}

export const RoomCreation = () => {
  const { user, rooms, setRooms } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [createRoom, { loading, error, data }] = useMutation(CREATE_ROOM, {
    onCompleted: (data: CreateRoomResult) => {
      setRooms([data.createRoom, ...(rooms || [])]);
      inputRef.current && (inputRef.current.value = "");
    },
    onError: (error) => {
      console.error("CREATE_ROOM onError", error);
    },
  });

  const handleCreateRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;

    if (!name) return;

    createRoom({
      variables: {
        name,
        userId: user?.id,
      },
    });
  };

  return (
    <form
      className="room_creation"
      onSubmit={handleCreateRoom}
      style={{
        height: "3rem",
        display: "flex",
        gap: ".5rem",
      }}
    >
      <TextInput
        ref={inputRef}
        name="name"
        placeholder="Create a room..."
        fullWidth
      />
      <Button
        primary
        type="submit"
        style={{ height: "100%" }}
        disabled={loading}
      >
        Create
      </Button>
    </form>
  );
};
