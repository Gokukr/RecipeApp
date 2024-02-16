import React, { useState, useEffect } from "react";
import AddRecipe from "./components/AddRecipe";
function App() {
  const userID = "";
  return (
    <div className="App">
      {/* <Header /> */}
      <main className="container mx-auto">
        <AddRecipe userId={userID} />
      </main>
      {/* Footer */}
    </div>
  );
}

export default App;
