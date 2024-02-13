import React from "react";

const Card = ({ foodName, timeTaken, imageUrl }) => {
  return (
    <div className="w-64 h-56 bg-darkslategray-100 shadow-md rounded-lg overflow-hidden flex flex-col mr-4">
      <img src={imageUrl} alt={foodName} className="w-full h-32 object-cover" />
      <div className="p-5 flex flex-wrap h-10 justify-between">
        <div className="mt-[-2rem] ">
          <h3
            className="text-24px font-open-sans mb-1 text-gray-300"
            style={{ letterSpacing: "0.1em" }}
          >
            {foodName}
          </h3>
          <p
            className="text-gray-400 text-sm mb-1 mt-0 font-open-sans"
            style={{ letterSpacing: "0.05em" }}
          >
            Total Time: {timeTaken}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
