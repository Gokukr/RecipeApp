import React from "react";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import "./index.css";
import Dashboard from "./components/Dashboard.jsx";
import Dash from "./components/dashboard.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/user-profile.js";
import Detailrecipe from "./components/detail-recipe.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/detail-recipe/:recipeId/:userId" element={<Detailrecipe recipeId={recipeid} userId={userId}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
