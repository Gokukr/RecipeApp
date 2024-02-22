import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [Ttoken, setTtoken] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = Cookies.get('token');
    const type = Cookies.get('role');
    setRole(type);
    setTtoken(token);
  }, []); 

  return (
    <div>
      Hello World {Ttoken}
      <br/>
      {role}
    </div>
  );
}