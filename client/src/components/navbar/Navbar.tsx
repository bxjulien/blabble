import { useNavigate } from "react-router-dom";
import { Button } from "react95";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Button
        fullWidth
        style={{
          height: "100%",
        }}
        active={
          window.location.pathname === "/" ||
          window.location.pathname.includes("/room")
        }
        onClick={() => navigate("/")}
      >
        <img
          src="/src/assets/world.png"
          alt="world"
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      </Button>
      <Button
        fullWidth
        style={{
          height: "100%",
        }}
        active={window.location.pathname === "/settings"}
        onClick={() => navigate("/settings")}
      >
        <img
          src="/src/assets/settings.png"
          alt="settings"
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      </Button>
    </div>
  );
};
