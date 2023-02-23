import { Button } from "react95"

export const Navbar = () => {

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Button
        style={{
          height: "100%",
        }}
        fullWidth
        active
      >
        Home
      </Button>
      <Button
        fullWidth        
        style={{
          height: "100%",
        }}
      >
        Settings
      </Button>
    </div>
  )
}