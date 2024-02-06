import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:1200/api/data")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React and Express App</h1>
        <p>Message from Server: {message}</p>
      </header>
    </div>
  );
}

export default App;
