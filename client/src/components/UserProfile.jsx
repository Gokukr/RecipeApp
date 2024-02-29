import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePassword.jsx";
import CulinarianRequests from "./CulinarianRequests.jsx";

function UserProfile(userId) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  userId = Cookies.get("user_id");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const [request,setRequest] = useState("Request to Culirian")
  const [disabled, setDisabled] = useState(false);
  const [type,setType] = useState("user")

  useEffect(() =>
  {
    const token = Cookies.get("token");
    axios
    .get("http://localhost:1200/api/is-verify", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
    .then((response) => {
      console.log(response.data);
      setVerify(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      navigate("/");
    });
  },[])
  useEffect(() => {
    const type = Cookies.get("role");
    if(!(type==="admin"))
    {
    const fetchData = async () => {
      try {
        const user_id = Cookies.get("user_id");
        const body = { user_id };
        const response = await fetch("http://localhost:1200/api/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      
          const data = await response.json();
          if (data.exists) {
            setRequest("Request is pending");
            setDisabled(true);
          }
          else
          {
            setRequest("Request to Culirian")
            setDisabled(false);
          }
        
      } catch (error) {
        console.error('Error:', error.message);
        // Handle errors if needed
      }
    };

    fetchData(); 
  }
  else
  {
    setType("admin");
  }

  }, []);
  useEffect(() => {
    if(verify)
    {
    const url = `http://localhost:1200/api/detail/user-profile/${userId}`;
    axios.get(url).then((response) => {
      setUser(response.data);
      setRole(response.data.role);
      setGender(response.data.gender);
    });
  }
  }, [userId,verify]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if(verify)
    {
    axios
      .get(`http://localhost:1200/api/detail/recipe-count/${userId}`)
      .then((response) => {
        setCount(response.data.count);
      });
    }
  }, [userId,verify]);
  const handleUpdateProfile = () => {
    console.log("Updating Profile");
    navigate("/UpdateProfile");
  };
  const [showModal, setShowModal] = useState(false);
  const [CulinarianResquest,setCulinarianRequest] = useState(false);
  const CulirianOpenModel = ()=>setCulinarianRequest(true);
  const CulirianCloseModel = () => setCulinarianRequest(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="user-profile-out bg-white">
        {user ? (
          <div>
            <div className="profile-card bg-[#2c3e50] flex justify-between px-10 pt-16 pb-52">
              <span class=" text-white text-[50px]">Hello !! {user.name}</span>
              <div className="profile-buttons flex gap-4 ml-auto mr-5 py-2">
              {type === "user" && (
                             <button
                            disabled={disabled}
                            className="text-base bg-red-500 text-white rounded-md"
                            onClick={CulirianOpenModel}
                              >
                                {request}
                              </button>
                            )}

                { CulinarianResquest && (
                   <CulinarianRequests
                   show={CulinarianResquest}
                   handleClose={CulirianCloseModel}
                   />
                ) 
                }
                <button
                  onClick={handleOpenModal}
                  className="text-base bg-blue-500 text-white px-4 py-1 rounded-md ml-2"
                >
                  Change Password
                </button>
                {showModal && (
                  <ChangePasswordModal
                    show={showModal}
                    handleClose={handleCloseModal}
                  />
                )}
                <button
                  className="text-base pl-1 bg-orange-500 text-white rounded-md"
                  onClick={handleUpdateProfile}
                >
                 Edit Profile
                </button>
              </div>
            </div>

            <div class="user-profile-body flex mt-[-50px]">
              <div class="card-profile w-[30%] ml-6 mt--2 bg-white rounded-lg border-solid border-black border-2 flex flex-col justify-center items-center">
                {(gender === "Male" || gender === "m") && (
                  <img
                    src="./assets/male-avatar.png"
                    alt="user"
                    class="rounded-full h-[200px] w-[200px] "
                  ></img>
                )}
                {(gender === "Female" || gender === "f") && (
                  <img
                    src="./assets/Female-Avatar.png"
                    alt="user"
                    class="rounded-full h-[200px] w-[200px] "
                  ></img>
                )}
                <h3 class="pt-4 ">{user.name}</h3>
                <h3 class="pt-4 ">{user.address}</h3>
              </div>

              <div className="profile-details w-[70%] mx-6 mt--7 bg-white rounded-lg border-solid border-black border-2 flex flex-col">
                {role === "admin" && (
                  <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-2">
                    Total Recipes Added: {count}
                  </p>
                )}

                <p class="mx-4 mt-4  rounded-lg bg-[#f6f6f6] px-3 py-3 border-soild border-[#2c3e50] border-1">
                  About: {user.about}
                </p>
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
