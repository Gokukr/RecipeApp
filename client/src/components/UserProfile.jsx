import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePassword.jsx";

function UserProfile(userId) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  userId = Cookies.get("user_id");
  const [role, setRole] = useState('');
  const [gender, setGender] =useState('');
  useEffect(() => {
    const url = `http://localhost:1200/api/detail/user-profile/${userId}`;
    axios.get(url).then((response) => {
      setUser(response.data);
      setRole(response.data.role);
      setGender(response.data.gender);
    });
  }, [userId]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:1200/api/detail/recipe-count/${userId}`)
    .then((response) => {
      setCount(response.data.count);
    });
  }, [userId]);
  const handleJumpToSavedRecipes = () => {
    console.log('saved recipes');
    navigate("/saved-recipe");
    
  };
  const [showModal, setShowModal] = useState(false);
  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Header />
      <div className="user-profile-out bg-white">          
            {user ? (
              <div>
              <div className="profile-card bg-[#2c3e50] flex justify-between px-10 pt-16 pb-52">
                <span class=" text-white text-[50px]">Hello !! {user.name}</span>
                <div className="profile-buttons flex gap-4 ml-auto mr-5 py-2">
                    
                    <button onClick={handleOpenModal} className="text-base bg-blue-500 text-white px-4 py-1 rounded-md ml-4">
                      Change Password
                    </button>
                    {showModal && 
                    <ChangePasswordModal
                      show={showModal}
                      handleClose={handleCloseModal}
                    />
                    }
                    <button
                      className="text-base pl-1 bg-orange-500 text-white rounded-md"
                      onClick={handleJumpToSavedRecipes}
                    >
                    Saved Recipes
                    </button>
                    
                  </div>
                
              </div>
              
                <div class="user-profile-body flex mt-[-50px]">
                <div class="card-profile w-[30%] ml-6 mt--2 bg-white rounded-lg border-solid border-black border-2 flex flex-col justify-center items-center">
                    {(gender === 'Male' || gender === 'm') && (
                      <img src="./assets/male-avatar.png" alt="user" class="rounded-full h-[200px] w-[200px] "></img>
                    )}
                    {(gender === 'Female' || gender === 'f') && (
                      <img src="./assets/Female-Avatar.png" alt="user" class="rounded-full h-[200px] w-[200px] "></img>
                    )}
                    <h3 class="pt-4 ">{user.name}</h3>
                    <h3 class="pt-4 ">{user.address}</h3>
                </div>

                <div className="profile-details w-[70%] mx-6 mt--7 bg-white rounded-lg border-solid border-black border-2 flex flex-col">
                  {role === "admin" && 
                      <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-2">
                        Total Recipes Added: {count}
                      </p>
                  }

                    <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-1">About:</p>
                    <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6]  px-3 py-3 border-soild border-[#2c3e50] border-1">
                      First Name: {user.fname}
                    </p>
                    <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-1">
                      Last Name: {user.lname}
                    </p>
                    <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-1">
                      Email: {user.email}
                    </p>
                    <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-1">
                      Gender: {user.gender}
                    </p>
                    <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-1">
                      Phone Number: {user.phone}
                    </p>
                    
                    
                  
                </div>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
      <Footer />
          </div>
    </>
  );
}

export default UserProfile;
