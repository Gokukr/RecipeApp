import React from "react";
import { Link } from "react-router-dom";

const Card = ({ foodName, timeTaken, imageUrl, id }) => {
  // console.log(id);

  return (
    <Link to={`/user/detail-recipe/${id}`}>
      {/* {name} */}

      <div className="w-64 h-56 bg-darkslategray-100 shadow-md rounded-lg overflow-hidden flex flex-col mr-4">
        <img
          src={imageUrl}
          alt={foodName}
          className="w-full h-32 object-cover"
        />
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
    </Link>
  );
};

export default Card;
