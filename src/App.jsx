import React from "react";
import Game from "./Game";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full screen vertically
        background: "#f0f0f0", // 
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Jume Game by Arun</h1>
        <Game />
      </div>
    </div>
  );
}

export default App;
