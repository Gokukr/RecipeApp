import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../assets/design.png"; // Make sure this path is correct
import Cookies from "js-cookie";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const notify = (message) => toast(message);
  const Navigate = useNavigate();
  // const [checkpassword, setcheckpasssowrd] = useState("");

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:1200/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        const token = parseRes.token;
        Cookies.set("token", token, { expires: 1 });
        Cookies.set("role", parseRes.role, { expires: 1 });
        Cookies.set("user_id", parseRes.user_id);
        notify("Successfully Logged in");
        setTimeout(() => {
          Navigate("/dashboard");
        }, 1000);
      } else {
        notify("Invalid password or Invalid Email");
        Navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-1/2 p-8">
        <div className="space-y-4">
          <p className="text-lg text-gray-700 font-semibold">
            Users can search for recipes based on various criteria such as
            ingredients, cuisine, dietary preferences (e.g., vegetarian,
            gluten-free), meal type (e.g., breakfast, dinner), or cooking time.
            Advanced filtering options allow users to narrow down their search
            results to find recipes that match their specific preferences.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            Once users have selected their recipes for the week or month, the
            system can automatically generate a grocery list based on the
            ingredients required for those recipes. This feature simplifies the
            process of grocery shopping by ensuring users don't forget any items
            they need.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            Some recipe management systems offer features to assist users during
            the cooking process. This may include step-by-step instructions with
            timers, ingredient scaling (for adjusting serving sizes), cooking
            tips.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            Users can personalize their experience by creating profiles with
            their dietary preferences, allergies, and favorite recipes. The
            system can then recommend recipes tailored to their tastes and
            requirements. Users may also be able to customize recipes by adding
            notes, substitutions, or variations.
          </p>
        </div>
      </div>

      <div className="w-1/3 p-8 bg-cover bg-center">
        <div
          className="bg-white bg-opacity-75 rounded-lg p-6"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>

          <form className="mt-4 space-y-4" onSubmit={onSubmitForm}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-4 text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
                className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-4 text-gray-900"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
                className="block w-full rounded-md border border-black border-opacity-100 border-solid py-1.5 text-gray-900 shadow-sm ring-[#D9D9D9] ring-1placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#2C3E50] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}