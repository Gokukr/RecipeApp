import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePassword.jsx";
import femaleAvatar from "../assets/Female-Avatar.png";
import maleAvatar from "../assets/male-avatar.png";
import avatar from "../assets/Vector (1).png";

function UserProfile(userId) {
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [user, setUser] = useState();
  userId = Cookies.get("user_id");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const editCSS = "ring-1 ring-gray-300 focus:ring-gray-300";
  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get("http://localhost:1200/api/is-verify", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((response) => {
        setVerify(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    if (verify) {
      const url = `http://localhost:1200/api/detail/user-profile/${userId}`;
      axios.get(url).then((response) => {
        setUser(response.data);
        setRole(response.data.role);
        setFname(response.data.fname);
        setLname(response.data.lname);
        setAbout(response.data.about);
        setGender(response.data.gender);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      });
    }
  }, [userId, verify]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (verify) {
      axios
        .get(`http://localhost:1200/api/detail/recipe-count/${userId}`)
        .then((response) => {
          setCount(response.data.count);
        });
    }
  }, [userId, verify]);

  const [favRecipeCount, setFavRecipeCount] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:1200/api/detail/favCount/${userId}`)
      .then((response) => {
        setFavRecipeCount(response.data.count);
      });
  });

  const [LikedCuisine, setLikedCuisine] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:1200/api/detail/likedCuisine/${userId}`)
      .then((response) => {
        setLikedCuisine(response.data.cuisine);
      });
  });

  const [favCourse, setFavCourse] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:1200/api/detail/favCourse/${userId}`)
      .then((response) => {
        setFavCourse(response.data.course);
      });
  });
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:1200/api/detail/edit-profile", {
        fName,
        lName,
        address,
        gender,
        phone,
        about,
        userId,
      });
      notify("Profile Updated!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) handleSave();
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };
  return (
    <>
      <Header />

      <ToastContainer />
      <div className="user-profile-out bg-white">
        {user ? (
          <div>
            <div className="profile-card bg-primary-100 flex justify-between px-10 pt-16 pb-52">
              <span className=" text-white text-[50px]">
                Hello !! {fName + " " + lName}
              </span>
              <div className="profile-buttons flex gap-4 ml-auto mr-5 py-2">
                <button
                  onClick={handleOpenModal}
                  className="text-base bg-blue-500 text-white px-4 py-1 rounded-md ml-4"
                >
                  Change Password
                </button>

                {showModal && (
                  <ChangePasswordModal handleClose={handleCloseModal} />
                )}
              </div>
            </div>

            <div className="user-profile-body flex mt-[-50px]">
              <div className="card-profile w-[30%] ml-6 mb-5 bg-white rounded-lg border-solid border-black border-2 flex flex-col justify-center items-center">
                {gender === "Male" && (
                  <img
                    src={maleAvatar}
                    alt="Maleuser"
                    className="rounded-full h-[200px] w-[200px] "
                  ></img>
                )}
                {gender === "Female" && (
                  <img
                    src={femaleAvatar}
                    alt="Femaleuser"
                    className="rounded-full h-[200px] w-[200px] "
                  ></img>
                )}
                {gender === "Others" && (
                  <img
                    src={avatar}
                    alt="user"
                    className="rounded-full h-[200px] w-[200px] "
                  ></img>
                )}
                <h3 className="pt-4 font-sans">{fName + " " + lName}</h3>
                <h3 className="pt-4 ">
                  <input
                    type="text"
                    className={`text-black text-center font-bold font-sans box-border w-full rounded-lg border-0 ${
                      isEditMode ? editCSS : ""
                    }`}
                    value={address}
                    onChange={(e) => handleInputChange(e, setAddress)}
                    disabled={!isEditMode}
                  />
                </h3>
                <button onClick={handleEditProfile} className="bg-white">
                  {isEditMode ? (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="white"
                        className="stroke-primary-100"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 2H9v3h2z" />
                        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="white"
                      className="stroke-primary-100"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="profile-details w-[70%] mx-6 mt--7 ">
                <div className="bg-white rounded-lg border-solid border-black border-2 ">
                  <div className="mt-5 font-sans pl-3 mx-4 flex items-center rounded-lg bg-textbg">
                    <label className="w-1/6">First Name:</label>
                    <input
                      type="text"
                      className={`text-black font-sans ml-4 w-full rounded-lg bg-textbg border-0 ${
                        isEditMode ? editCSS : ""
                      }`}
                      value={fName}
                      onChange={(e) => handleInputChange(e, setFname)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="mt-5 font-sans pl-3 mx-4 flex items-center rounded-lg bg-textbg">
                    <label className="w-1/6">Last Name: </label>
                    <input
                      type="text"
                      className={`text-black font-sans ml-4 w-full rounded-lg bg-textbg border-0 ${
                        isEditMode ? editCSS : ""
                      }`}
                      value={lName}
                      onChange={(e) => handleInputChange(e, setLname)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="mt-5 font-sans pl-3 mx-4 flex items-center rounded-lg bg-textbg">
                    <label className="w-1/6">About:</label>
                    <input
                      type="text"
                      className={`text-black font-sans ml-4 w-full rounded-lg bg-textbg border-0 ${
                        isEditMode ? editCSS : ""
                      }`}
                      value={about}
                      onChange={(e) => handleInputChange(e, setAbout)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="mt-5 font-sans pl-3 mx-4 flex items-center rounded-lg bg-textbg">
                    <label className="w-1/6">Email:</label>
                    <input
                      type="text"
                      className={`text-black font-sans ml-4 w-full rounded-lg bg-textbg border-0 ${
                        isEditMode ? "text-gray-500" : ""
                      }`}
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="mt-5 font-sans pl-3 mx-4 flex items-center rounded-lg bg-textbg">
                    <label className="w-1/6">Gender:</label>
                    {isEditMode ? (
                      <div
                        className={`w-full rounded-lg flex ml-4 pl-5 py-2 ${
                          isEditMode ? editCSS : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="male"
                          value="Male"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          checked={gender === "Male"}
                          onChange={(e) => handleInputChange(e, setGender)}
                          disabled={!isEditMode}
                        />
                        <label htmlFor="male" className="ml-1 mr-3">
                          Male
                        </label>

                        <input
                          type="checkbox"
                          id="female"
                          value="Female"
                          checked={gender === "Female"}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          onChange={(e) => handleInputChange(e, setGender)}
                          disabled={!isEditMode}
                        />
                        <label htmlFor="female" className="ml-1 mr-3">
                          Female
                        </label>

                        <input
                          type="checkbox"
                          id="others"
                          value="Others"
                          checked={gender === "Others"}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          onChange={(e) => handleInputChange(e, setGender)}
                          disabled={!isEditMode}
                        />
                        <label htmlFor="others" className="ml-1">
                          Others
                        </label>
                      </div>
                    ) : (
                      <p className="text-black font-sans ml-7 w-full rounded-lg bg-textbg border-0 my-2">
                        {gender}
                      </p>
                    )}
                  </div>
                  <div className="my-5 font-sans pl-3 mx-4 flex items-center rounded-lg bg-textbg">
                    <label className="w-1/6">Phone Number:</label>
                    <input
                      type="text"
                      className={`text-black font-sans ml-4 w-full rounded-lg bg-textbg border-0 ${
                        isEditMode ? editCSS : ""
                      }`}
                      value={phone}
                      onChange={(e) => handleInputChange(e, setPhone)}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
                <div className="lg:flex md:flex lg:justify-around ">
                  {role === "admin" && (
                    <div className="bg-primary-100 m-5 w-52 h-48 rounded-2xl relative">
                      <p className="font-sans text-white absolute left-5 right-5 top-2 text-center text-xl ">
                        Total Recipes
                      </p>
                      <div className="rounded-lg bg-white absolute top-24 left-5 right-5 bottom-5 text-center text-xl pt-6">
                        {count}
                      </div>
                    </div>
                  )}
                  <div className="bg-primary-100 m-5 w-52 h-48 rounded-2xl relative">
                    <p className="font-sans text-white absolute left-5 right-5 text-center text-xl ">
                      Number of Favorite Recipes
                    </p>
                    <div className="rounded-lg bg-white absolute top-24 left-5 right-5 bottom-5 text-center text-xl pt-6">
                      {favRecipeCount}
                    </div>
                  </div>
                  <div className="bg-primary-100 m-5 w-52 h-48 rounded-2xl relative">
                    <p className="font-sans text-white absolute left-5 right-5 top-2 text-center text-xl ">
                      Favorite Cuisine
                    </p>
                    <div className="rounded-lg bg-white absolute top-24 left-5 right-5 bottom-5 text-center text-xl pt-6">
                      {LikedCuisine}
                    </div>
                  </div>
                  <div className="bg-primary-100 m-5 w-52 h-48 rounded-2xl relative">
                    <p className="font-sans text-white absolute left-5 right-5 top-2 text-center text-xl">
                      Favorite Course
                    </p>
                    <div className="rounded-lg bg-white absolute top-24 left-5 right-5 bottom-5 text-center text-xl pt-6">
                      {favCourse}
                    </div>
                  </div>
                </div>
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
