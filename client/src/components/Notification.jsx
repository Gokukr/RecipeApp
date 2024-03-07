import React, { useState } from "react";

const Notification = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && (
        <div
          className="absolute top-12 right-0 bg-white p-2 rounded-md shadow-md"
          style={{ width: "250px", height: "400px" }}
        >
          <p>This is the notification tab </p>
        </div>
      )}
    </>
  );
};

export default Notification;
