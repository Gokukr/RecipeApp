import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Container from "./Container";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Ttoken, setTtoken] = useState("");
  const [role, setRole] = useState("");
  const [user_id, Setuser_id] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // Retrieve token from cookie when the component mounts
    const token = Cookies.get("token");
    const type = Cookies.get("role");
    const id = Cookies.get("user_id");
    // Update the state with the retrieved token
    setRole(type);
    setTtoken(token);
    Setuser_id(id);
  }, []);
  //console.log(user_id);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:1200/api/getdata");
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const cuisines = [
    { name: "North Indian", filter: "north Indian" },
    { name: "Continental", filter: "Continental" },
    { name: "Chinese", filter: "Chinese" },
    { name: "Japanese", filter: "Japanese" },
    { name: "Italian", filter: "Italian" },
  ];
  return (
    <div>
      <Header />
      <Search />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        cuisines.map((cuisine) => (
          <Container key={cuisine.name} cuisineName={`${cuisine.name}`}>
            {data
              .filter((item) => item.cuisine === cuisine.filter)
              .map((item, index) => (
                <Card
                  key={index}
                  foodName={item.name}
                  imageUrl={item.image}
                  timeTaken={`${item.total_time} mins`}
                  id={item.id}
                  rating={`${item.rating}⭐`}
                />
              ))}
          </Container>
        ))
      )}
      <Footer />
    </div>
  );
}
