import { Avatar, Button, Window, WindowContent, WindowHeader } from "react95";
import { DELETE_ROOM, ROOM } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useNavigate, useParams } from "react-router-dom";

import { Chat } from "../components/room/chat/Chat";
import { Login } from "../components/home/join/Login";
import { Messages } from "../components/room/messages/Messages";
import { useAppContext } from "../context";

export const Room = () => {
  let { id } = useParams<{ id: string }>();

  const { user } = useAppContext();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(ROOM, {
    variables: { id },
  });

  const [deleteRoom, { loading: loadingDelete }] = useMutation(DELETE_ROOM, {
    variables: { id },
  });

  const handleDeleteRoom = () => {
    deleteRoom({
      variables: {
        id,
      },
      onCompleted: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("DELETE_ROOM onError", error);
      },
    });
  };

  return (
    <Window
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <WindowHeader>
        <h1>{data?.room.name}</h1>
        <Button
          onClick={handleDeleteRoom}
          style={{
            position: "absolute",
            top: "10px",
            right: "80px",
            width: "40px",
          }}
          disabled={loadingDelete}
        >
          <img
            src="/src/assets/trash.png"
            alt="delete"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <strong>X</strong>
        </Button>
      </WindowHeader>

      <WindowContent
        style={{
          display: "grid",
          gridRowGap: "10px",
        }}
      >
        <div>
          <h2>user list</h2>
          {data?.room.users.map((user: any) => (
            <div key={user.id}>
              <Avatar size={50} src={`https://loremflickr.com/500/500`} />
            </div>
          ))}
        </div>

        {id && (
          <Messages
            roomId={id}
            messages={data?.room.messages}
            loading={loading}
            error={error}
          />
        )}

        {!user && <Login />}
        {user && id && <Chat roomId={id} />}
      </WindowContent>
    </Window>
  );
};
