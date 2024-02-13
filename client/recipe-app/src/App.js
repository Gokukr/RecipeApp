import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";
import "./index.css";

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
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
