import React from "react";

const Card = ({ foodName, timeTaken, imageUrl, id }) => {
  console.log("Props received in Card component:", {
    foodName,
    timeTaken,
    imageUrl,
    id,
  });

  return (
    <div className="w-64 h-56 bg-darkslategray-100 shadow-md rounded-lg overflow-hidden flex flex-col mr-4">
      <img src={imageUrl} alt={foodName} className="w-full h-32 object-cover" />
      <div
        className="p-4 flex flex-col justify-between"
        style={{ paddingTop: "5px" }}
      >
        <h3
          className="text-base text-gray-300 font-open-sans mb-1"
          style={{ letterSpacing: "0.05em", marginLeft: "-5px" }}
        >
          {foodName}
        </h3>
        <p
          className="text-xs text-gray-400 font-open-sans mb-1"
          style={{ letterSpacing: "0.03em", marginLeft: "-5px" }}
        >
          Total Time: {timeTaken}
        </p>
      </div>
    </div>
  );
};

export default Card;
