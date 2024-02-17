import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function UserProfile(userId) {
  const [user, setUser] = useState(null);
  // userId = 'cded7396-c732-11ee-993a-505a65b0ab55';
  useEffect(() => {
    const userId = Cookies.get("user_id");
    const url = `http://localhost:1200/api/user-profile/${userId}`;
    axios.get(url).then((response) => {
      setUser(response.data);
    });
  }, [userId]);

  // const handleJumpToSavedRecipes = () => {
    //redirect to the saved recipes page
  // };

  return (
    <>
      <Header />
      <div className="profile-container mt-10 justify-center items-center h-screen py-10">
        {user ? (
          <div className="profile-card mt-10 p-8 rounded-lg shadow-md bg-white flex flex-col">
            <div className="profile-header flex items-center mb-4">
              <h1 className="text-3xl ml-10 font-bold">{user.name}</h1>
              <div className="profile-buttons flex gap-4 ml-auto mr-10">
                <button className="text-base bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Change Password
                </button>
                <Link
                  className="text-base bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  to={`/api/${Cookies.get("user_id")}/saved-recipes`}
                >
                  Saved Recipes
                </Link>
              </div>
            </div>
            <div className="profile-details flex flex-col gap-4">
              <div class="mx-30p my-2 sm:my-10 px-4 py-6 rounded-xl bg-gray-300">
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  ID: {user.id}
                </p>
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  Name: {user.name}
                </p>
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  Email: {user.email}
                </p>
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  Gender: {user.gender}
                </p>
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  Phone Number: {user.phone}
                </p>
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  Role: {user.role}
                </p>
                <p class="ml-5 mt-4  rounded-lg bg-gray-100 w-[95%] px-5 py-3">
                  Password: {user.pass}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
