import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Frame } from "react95";
import { Home } from "./routes/home";
import { Navbar } from "./components/navbar/Navbar";
import { Room } from "./routes/room";
import { Settings } from "./routes/settings";

function App() {
  return (
    <div className="App">
      <Frame
        style={{
          padding: "0.5rem",
          height: "100%",
          width: "100%",
          maxWidth: "425px",
          display: "grid",
          gridTemplateRows: "auto 3rem",
          gridGap: "10px",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/room/:id" element={<Room />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </Frame>
    </div>
  );
}

export default App;
