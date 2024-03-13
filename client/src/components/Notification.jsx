import React, { useState, useEffect } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  console.log(notifications, "hello");

  useEffect(() => {
    fetchNotificationsFromAPI()
      .then((data) => setNotifications([data]))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await fetch("http://localhost:1200/api/notification");
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString() + " - " + date.toLocaleDateString();
  };

  return (
    <>
      {notifications.map((notification) => (
        <div
          key={notification.timestamp}
          className="absolute top-12 right-0 bg-white p-2 rounded-md shadow-md"
          style={{ width: "250px", height: "400px" }}
        >
          <p>{formatDate(notification.timestamp)}</p>
          <p>{notification.message}</p>
        </div>
      ))}
    </>
  );
};

export default Notification;
