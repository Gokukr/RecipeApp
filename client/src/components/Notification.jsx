import React, { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Notification = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const id = Cookies.get("user_id");
    axios.get(`http://localhost:1200/notify/notification1?user_id=${id}`)
      .then(response => {
        const notifications = response.data;
         notifications.forEach(notification => {
          console.log('ID:', notification.id);
          console.log('User ID:', notification.user_id);
          console.log('Reason:', notification.reason);
          console.log('Recipe ID:', notification.recipe_id);
          console.log('Created At:', notification.created_at);
          console.log('---------------------------------');
        });
      })
      .catch(error => {
        console.error('Error fetching notification data:', error);
      });
  }, []);
  
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
