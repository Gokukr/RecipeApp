import React from "react";

const Container = ({ cuisineName, children }) => {
  return (
    <div className="container mx-auto py-8 pl-12" style={{ width: "90%" }}>
      <h2 className="text-gray-800 font-semibold font-open-sans">
        {cuisineName}
      </h2>
      <div className="grid grid-cols-4 gap-8 mt-8">
        {children.map((child, index) => (
          <div key={index} className="flex justify-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
