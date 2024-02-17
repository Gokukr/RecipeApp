import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [Ttoken, setTtoken] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    // Retrieve token from cookie when the component mounts
    const token = Cookies.get('token');
    const type = Cookies.get('role');
    // Update the state with the retrieved token
    setRole(type);
    setTtoken(token);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      Hello World {Ttoken}
      <br/>
      {role}
    </div>
  );
}