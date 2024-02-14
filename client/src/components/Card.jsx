import React from "react";

const Card = ({ name, total_time }) => {
  return (
    <div className="w-64 h-56 bg-darkslategray-100 shadow-md rounded-lg overflow-hidden flex flex-col mr-4">
      <img src={'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={name} className="w-full h-32 object-cover" />
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