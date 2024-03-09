import React, { useState } from "react";

export const Dropdown = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative inline-block">
      <button
        className="text-gray-700 hover:text-black font-medium"
        onClick={toggleDropdown}
      >
        Information
      </button>
      {isActive && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children }) => {
  return <div className="py-2 px-4 hover:bg-gray-100">{children}</div>;
};

// const Header = () => {
//   return (
//     <div className="header">
//       <Dropdown>
//         <DropdownItem>
//           <div className="text-gray-900 font-semibold">Free Tutorials</div>
//           <a href="#" className="text-gray-700 hover:text-black">
//             All
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Latest
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Popular
//           </a>
//         </DropdownItem>
//         <DropdownItem>
//           <div className="text-gray-900 font-semibold">Courses</div>
//           <a href="#" className="text-gray-700 hover:text-black">
//             JavaScript
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             CSS
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             React
//           </a>
//         </DropdownItem>
//         <DropdownItem>
//           <div className="text-gray-900 font-semibold">Blog</div>
//           <a href="#" className="text-gray-700 hover:text-black">
//             All
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Latest
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Popular
//           </a>
//         </DropdownItem>
//         <DropdownItem>
//           <div className="text-gray-900 font-semibold">Other</div>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Twitter
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Newsletter
//           </a>
//           <a href="#" className="text-gray-700 hover:text-black">
//             Discord
//           </a>
//         </DropdownItem>
//       </Dropdown>
//       <a href="#" className="text-gray-700 hover:text-black font-medium">
//         Pricing
//       </a>
//       <Dropdown>
//         <DropdownItem>
//           <form className="login-form">
//             <label htmlFor="email" className="text-gray-900 font-semibold">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="block w-full mt-1 py-1 px-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <label htmlFor="password" className="text-gray-900 font-semibold">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="block w-full mt-1 py-1 px-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
//             >
//               Login
//             </button>
//           </form>
//         </DropdownItem>
//       </Dropdown>
//     </div>
//   );
// };

// export default Header;
