import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../assets/design.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  // const [checkuser, setcheckuser] = useState("");
  const Navigate = useNavigate();
  const notify = (message) => toast(message);

  const FormSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstname,
        lastname,
        email,
        address,
        gender,
        phonenumber,
        password,
        repassword,
      };
      const response = await fetch("http://localhost:1200/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status === 401) {
        const errorMessage = await response.text();
        // Call notify when there's an error
        notify(errorMessage);
      } else {
        notify("Successfull Registered");
        setTimeout(() => {
          Navigate("/");
        }, 500);
      }
    } catch (err) {
      console.log(err.message);
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setGender("");
    setPassword("");
    setrePassword("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="w-full h-screen flex items-start">
      <ToastContainer />
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <p className="text-4x1 text-black font-bold my-4">
            Users can search for recipes based on various criteria such as
            ingredients, cuisine, dietary preferences (e.g., vegetarian,
            gluten-free), meal type (e.g., breakfast, dinner), or cooking time.
            Advanced filtering options allow users to narrow down their search
            results to find recipes that match their specific preferences
          </p>
          <p className="text-x1 text-black  font-bold">
            Once users have selected their recipes for the week or month, the
            system can automatically generate a grocery list based on the
            ingredients required for those recipes. This feature simplifies the
            process of grocery shopping by ensuring users don't forget any items
            they need
          </p>
          <p className="text-4x1 text-black  font-bold my-4">
            Some recipe management systems offer features to assist users during
            the cooking process. This may include step-by-step instructions with
            timers, ingredient scaling (for adjusting serving sizes), cooking
            tips,
          </p>
          <p className="text-x1 text-black  font-bold">
            Users can personalize their experience by creating profiles with
            their dietary preferences, allergies, and favorite recipes. The
            system can then recommend recipes tailored to their tastes and
            requirements. Users may also be able to customize recipes by adding
            notes, substitutions, or variations
          </p>
        </div>
        <img
          src={Background}
          alt="Recipe Photo"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 w-26%"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white bg-opacity-75 rounded-lg px-4 py-4 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Signup
            </h2>
          </div>

          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={FormSubmit} method="POST">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 px-2	focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    name="phone"
                    type="tel"
                    value={phonenumber}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 max-length-10 min-length-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-1">
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={(e) => setGender(e.target.value)}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={(e) => setGender(e.target.value)}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        name="gender"
                        value="Others"
                        checked={gender === "Others"}
                        onChange={(e) => setGender(e.target.value)}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Others</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Re-enter Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    name="repassword"
                    type="password"
                    value={repassword}
                    onChange={(e) => setrePassword(e.target.value)}
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    address
                  </label>
                </div>
                <div className="mt-1">
                  <textarea
                    name="address"
                    type="textarea"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-1">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#2C3E50] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to="/"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}