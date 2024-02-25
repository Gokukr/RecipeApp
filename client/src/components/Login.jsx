import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../assets/Design2.png";
import hatimage from "../assets/icon.jpeg"; 
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isotpModelOpen,setOtpMOdelOPen] = useState(false)
  const [Email,setEmail] = useState("");
  const[otp,setotp] = useState("");
  const[recivedOtp,setrecivedOTP] = useState("");
  const[isModelPassword,setModelPassword] = useState(false);
  const [Password,setPassword] = useState("");
  const [repassword,setrePassword] = useState("");
  const [homeScreen,setHomeScreen] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const notify = (message) => toast(message);
  const Navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setHomeScreen(!homeScreen);
    setEmail("");
    
  };


  const onPasswordForm = async(e) =>{
    e.preventDefault();
    try{
          const email = Cookies.get('email');
          const body = {email,Password,repassword};
          const response = await fetch("http://localhost:1200/api/ChangePassword", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(body)
       })
       if (response.status === 401) {
           const errorMessage = await response.text();
             // Call notify when there's an error
             notify(errorMessage);
       }
       else {
           Cookies.remove('email');
           notify("Password  Changed Successfully");
           
           setTimeout(() => {
             Navigate("/");
             setHomeScreen(!homeScreen);
             setModelPassword(!isModelPassword);
             setEmail("");
             setPassword("");
             setrePassword("");
             setotp("");
             
           },1000);
           
         }
    }
    catch(err)
    {
       console.log(err.message);
    }

}

  const OTPSubmit = async(e)=>
{ 
    e.preventDefault();
    if(otp===recivedOtp)
    { 
      notify("OTP Verified");
      setTimeout(() => {
      setOtpMOdelOPen(!isotpModelOpen);
      // Navigate("/");
      setModelPassword(!isModelPassword);
    },1000)
    }
    else
    {
      notify("OTP Entered by you is incorrect");
    }
}
  const PasswordModel = ()=>
  {
    setModelPassword(!isModelPassword);
    setHomeScreen(!homeScreen);
    setEmail("");
    setPassword("");
    setrePassword("");
    setotp("");

  }
   
  const OTPModal = () =>
  {
     setOtpMOdelOPen(!isotpModelOpen);
     setHomeScreen(!homeScreen);
     setotp("");
     setEmail("");
  }
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

  
const FormSubmit = async(e) =>
{
  try{
  e.preventDefault();
  const body = {Email}
  console.log(Email);
  Cookies.set('email',Email,{expires:1});
  const response = await fetch("http://localhost:1200/api/OtpVerify",
  {
      method  :"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(body)
  });
  
 
  if (response.status === 401) {
    const errorMessage = await response.text();
      notify(errorMessage);
  } 
  else
  {  
    const parseRes = await response.json()
    notify("OTP is sent to registered email address");
    setTimeout(() => {
    setrecivedOTP(parseRes.otp);
    setIsModalOpen(false);
    setOtpMOdelOPen(!isotpModelOpen);
    },1000)
  }
  }
   catch(err){
    console.log(err.message)
   }
}

  return (
    <div style={{
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
       <ToastContainer />
       {homeScreen &&( 
      <div className='flex items-center justify-center'>
        <div className='relative flex flex-col m-6 space-y-8 bg-[#F9F9F9] shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
          <div className='flex flex-col justify-center p-12 md:px-14 md:py-8'>
            <span className='mb-1 text-5xl text-center font-bold'>Login</span>
            <span className='font-light text-gray-400 mb-5 text-center'>Welcome Back! please enter your details</span>
            <form className="mt-4 space-y-4" onSubmit={onSubmitForm}>
            <div className='py-0.5'>
              <span className='mb-2 text-md'>Email</span>
              <input
                type='text'
                className='block w-full rounded-md border-0 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                name='email'
                id="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className='py-0.5'>
              <span className='mb-2 text-md'>Password</span>
              <input
                type="password"
                name="password"
                autoComplete="password"
                className="block w-full rounded-md border-0 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='flex items-center justify-between w-full mt-2'>
              <div className='flex items-center'>
                <input type="checkbox" className="ring-1 ring-inset ring-gray-300 mr-2" required />
                <span className='text-md'>Remember me</span>
              </div>
              <Link  onClick={toggleModal}
              className="block  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{' '}Forget password</Link>
            </div>
            <div className="flex justify-center">
              <button className="w-full bg-primary-100 text-white py-2 px-1 rounded-lg mb-2 hover:border-gray-300 mt-2">Sign in</button>
            </div>
            </form>
            <div className='text-center text-gray-400'>
              Don't have an account?{' '}
              <Link to="/SignUp" className='font-bold'>Sign Up</Link>
            </div>
          </div>
          <div className='relative'>
            <div alt="Background" className='w-[400px] h-full hidden rounded-r-2xl md:block object-cover bg-[#F9F9F9]' />
            <div className='absolute hidden bottom-10 right-0 p-6 md:block'>
              <span className='text-black text-xl'> 
              <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
  <li style={{ marginBottom: '10px' }}>
    <img
      className="relative z-[1]"
      loading="eager"
      alt=""
      src={hatimage}
      style={{ width: '200px', height: '50px' }}
    />
  </li>
  <li style={{ marginBottom: '10px' }}>Search for recipes by name, ingredients, or categories</li>
  <li style={{ marginBottom: '10px' }}>Browse a vast collection of recipes from various cuisines.</li>
  <li style={{ marginBottom: '10px' }}>Save favorite recipes for quick access.</li>
  <li style={{ marginBottom: '10px' }}>Step-by-step instructions with images for each recipe.</li>
  <li style={{ marginBottom: '10px' }}>User ratings and reviews for recipes.</li>
  <li style={{ marginBottom: '10px' }}>Clean and visually appealing design.</li>
</ul>
     
              </span>
            </div>         
          </div>      
        </div>
      </div>
      )}
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#F9F9F9] bg-opacity-80 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-[#F9F9F9] rounded-lg shadow">
              <div className="p-4 md:p-5">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5">
                <form class="space-y-4" onSubmit={FormSubmit}>
                    <div>
                    <span className='mb-2 text-md'>Email</span>
                    <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    value={Email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <button type="submit" className="w-full bg-primary-100 text-white py-2 px-2 rounded-lg mb-2 hover:border-gray-300 mt-2" >Get OTP</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
            </div>
             </div>
            </div>
          </div>
        </div>
      )}

       {isotpModelOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#F9F9F9] bg-opacity-80 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-[#F9F9F9] rounded-lg shadow">
              {/* Modal content */}
              <div className="p-4 md:p-5">
                <button
                  onClick={OTPModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                  <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

              
                <div class="p-4 md:p-5">
                <form class="space-y-4" onSubmit={OTPSubmit}>
                    <div>
                    <span className='mb-2 text-md'>Email</span>
                    <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    value={Email} onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div>
                    <span className='mb-2 text-md'>OTP</span>
                    <input type="text" name="otp" id="otp" className="block w-full rounded-md border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-0.5 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   value={otp} onChange={(e)=>setotp(e.target.value)} required />
                    </div>
                    <button type="submit" className="w-full bg-primary-100 text-white py-2 px-1 rounded-lg mb-2 hover:border-gray-300 mt-2">Verify OTP</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
              </div>
             </div>
            </div>
          </div>
        </div>
      )}
      
      {isModelPassword && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#F9F9F9] bg-opacity-80 flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-[#F9F9F9] rounded-lg shadow">
              {/* Modal content */}
              <div className="p-4 md:p-5">
                <button
                  onClick={PasswordModel}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                  <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

                {/* Modal body */}
                {/* Your form content here */}
                <div class="p-4 md:p-5">
                <form class="space-y-4" onSubmit={onPasswordForm}>
                    <div>
                    <span className='mb-2 text-md'>Password</span>
                    <input type="password" className="block w-full rounded-md border-0 px-0 text-gray-900 pl-0.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    value={Password} onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <div>
                    <span className='mb-2 text-md'>Re-Enter Password</span>
                    <input type="password"  className="block w-full rounded-md border-0 px-0 text-gray-900 pl-0.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={repassword}onChange={(e)=>setrePassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="w-full bg-primary-100 text-white py-2 px-5 rounded-lg mb-2 hover:border-gray-300 mt-2">Change Password</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    </div>
                </form>
            </div>
             </div>
            </div>
          </div>
        </div>
      )}
  </div>
  );
}