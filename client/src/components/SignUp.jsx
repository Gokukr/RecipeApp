import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../assets/Design2.png"; 
import hatimage from "../assets/icon.jpeg";
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
    <div style={{
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh", // Ensure the background covers the entire viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
       <ToastContainer />
  <div className='flex items-center justify-center min-h-screen bg-grey-100'>
  <div className='relative flex flex-col m-6 space-y-8 bg-[#F9F9F9] shadow-2xl  rounded-2xl md:flex-row md:space-y-0' >
      <div className='flex flex-col justify-center md:px-14 md:py-8 p-10'>
          <span className='mb-1 text-xl text-center font-bold'>Sign Up</span>
          <form onSubmit={FormSubmit} method="POST">
          <div className='mt-1.5'>
          <span className='mb-2 rext-md'>FirstName</span>
              <input
              type='text'
              className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='firstName'
              id="FirstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              />
          </div>
          <div className='mt-1.5'>
              <span className='mb-2 rext-md'>LastName</span>
              <input
              type='text'
              className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='lastname'
              id="LastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              />
          </div>
          <div className='mt-1.5'>
              <span className='mb-2 rext-md'>Email</span>
              <input
              type='email'
              className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='email'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>
          <div className='mt-1.5'>
              <span className='mb-2 rext-md'>Phone</span>
              <input
              type='tel'
              className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='phone'
              id="phone"
              value={phonenumber}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              required
              />
          </div>
          <div className='mt-1.5'>
          <span className='mb-2 rext-md'>Gender</span>
          <br></br>
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
          <div className='mt-1.5'>
              <span className='mb-2 rext-md'>Password</span>
              <input
              type='password'
              className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='password'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>
          <div className='mt-1.5'>
              <span className='mb-2 rext-md'>Re-Enter Password</span>
              <input
              type='password'
              className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='repassword'
              id="repassword"
              value={repassword}
              onChange={(e) => setrePassword(e.target.value)}
              required
              />
          </div>
          <div className='mt-1.5'>
    <span className='mb-2 text-md'>Address</span>
    <textarea
        type='text'
        className='block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pr-8 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        name='address'
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />
        </div>
        <button className='w-full lg:w-auto bg-primary-100 text-white px-40 py-2 rounded-lg mb-2 
        hover:text-black hover:border-gray-300 mt-2 '>Sign Up
        </button>
        </form>
          <div className='text-center text-grey-400'>
           Do you have an account?
           <Link to="/" className='font-bold'>Sign In</Link>
          </div>
              </div>
              <div className='relative'>
              <div alt="Img" className='w-[400px] h-full hidden ronded-r-2xl md:block object-cover '/>
              <div className='absolute hidden bottom-16 right-6 p-6 md:block'>
              <span className='text-black text-xl'>
              <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li style={{ marginBottom: '10px' }}>
              <img
                  className="relative z-[1]"
                  loading="eager"
                  alt=""
                  src={hatimage}
                  style={{ width: '200px', height: '50px' , marginBottom: '10px' }}
              />
              </li>
              <li style={{ marginBottom: '10px' }}>Users can search for recipes based on various criteria such as ingredients, cuisine, dietary preference.</li>
              <li style={{ marginBottom: '10px' }}>Search for recipes by name, ingredients, or categories.</li>
              <li style={{ marginBottom: '10px' }}>Browse a vast collection of recipes from various cuisines.</li>
              <li style={{ marginBottom: '10px' }}>Save favorite recipes for quick access.</li>
              <li style={{ marginBottom: '10px' }}>The system can automatically generate a grocery list based on the ingredients required for those recipes.</li>
              <li style={{ marginBottom: '10px' }}>Step-by-step instructions with images for each recipe.</li>
              <li style={{ marginBottom: '10px' }}>User ratings and reviews for recipes.</li>
              <li style={{ marginBottom: '25px' }}>Clean and visually appealing design.</li>
            </ul>
              </span>
           </div>
      </div>
  </div>
</div>
</div>
  );
}