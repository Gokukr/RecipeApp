import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUserProfile = ({ user, onClose }) => {
  const notify = (message) => toast(message);
  const id = user.id;
  const [gender, setUserGender] = useState(user.gender);
  const [phone, setUserPhone] = useState(user.phone);
  const [fName, setUserFname] = useState(user.fname);
  const [lName, setUserLname] = useState(user.lname);
  const [about, setUserAbout] = useState(user.about);
  const [address, setUserAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:1200/api/detail/edit-profile", {
        fName,
        lName,
        address,
        gender,
        phone,
        about,
        id,
      });
      notify("Profile Updated!");
      onClose();
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gainsboro bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-12 rounded-md w-96">
        <h2 className="text-whitesmoke font-semibold mb-4">Edit Profile</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fName"
                id="fName"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={fName}
                onChange={(e) => setUserFname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lName"
                id="lName"
                autoComplete="lName"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={lName}
                onChange={(e) => setUserLname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              About
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                className="font-sans block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="about"
                id="about"
                value={about}
                onChange={(e) => setUserAbout(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              Gender
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setUserGender(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out bg-gray-200"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setUserGender(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out bg-gray-200"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="Others"
                  checked={gender === "Others"}
                  onChange={(e) => setUserGender(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out bg-gray-200"
                />
                <span className="ml-2">Others</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              Phone
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="phone"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                value={phone}
                onChange={(e) => setUserPhone(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-whitesmoke font-open-sans">
              Address
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                className="font-sans block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setUserAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <button
              onClick={onClose}
              className="text-text font-semibold leading-6 text-primary-100 px-10 py-2 hover:bg-bg hover:text-zinc-950 bg-white cursor-pointer shadow-md font-sans text-base "
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-primary-100 font-semibold text-white hover:bg-primary-300 px-10 py-2 shadow-md cursor-pointer font-sans text-base "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
