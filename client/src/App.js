import React, { useState, useEffect } from "react";
import AddRecipe from "./components/AddRecipe";
function App() {
  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:1200/api/data")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  return (
    <div className="App bg-pale-silver">
      <header className="App-header bg-stone-100">
        {/* <h1>Welcome to React and Express App</h1>
        <p>Message from Server: {message}</p> */}
      </header>
      <main className="container mx-auto">
        <AddRecipe />
      </main>
      <footer className="bg-stone-100"></footer>
    </div>
  );
}

export default App;
