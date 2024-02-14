import React from "react";

const Card = ({ name, total_time }) => {
  return (
    <div className="w-64 h-56 bg-darkslategray-100 shadow-md rounded-lg overflow-hidden flex flex-col mr-4">
      <img src={'https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5.jpg'} alt={name} className="h-32 object-cover" />
      <div className="p-5 flex flex-wrap h-10 justify-between">
        <div className="mt-[-2rem] ">
          <h3
            className="text-24px font-open-sans mb-1 text-gray-300"
            style={{ letterSpacing: "0.1em" }}
          >
            {name}
          </h3>
          <p
            className="text-gray-400 text-sm mb-1 mt-0 font-open-sans"
            style={{ letterSpacing: "0.05em" }}
          >
            Total Time: {total_time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;