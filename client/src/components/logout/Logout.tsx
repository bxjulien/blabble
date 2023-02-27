import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Separator,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { useAppContext } from "../../context";

export const Logout = () => {
  const { user, setUser } = useAppContext();
  const [dogPP, setDogPP] = useState("");

  const fetchDogPP = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setDogPP(data.message);
  };

  useEffect(() => {
    fetchDogPP();
  }, []);

  const disconnect = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Window
      style={{
        width: "100%",
      }}
    >
      <WindowHeader>Account</WindowHeader>

      <WindowContent
        style={{
          display: "grid",
          gridRowGap: "10px",
        }}
      >
        <Avatar
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
          }}
        src={dogPP} />
        <h1
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          @{user?.name}
        </h1>

        <Separator />

        <Button
          style={{
            display: "flex",
            gap: "10px",
          }}
          onClick={disconnect}
        >
          Disconnect
          <img
            src="/src/assets/cross.png"
            alt="cross"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </Button>
      </WindowContent>
    </Window>
  );
};
