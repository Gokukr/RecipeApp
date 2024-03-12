import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import Card from "./Card";
import Container from "./Container";
import Cookies from "js-cookie";
import RecipeContainer from "./RecipeContainer";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Ttoken, setTtoken] = useState("");
  const [role, setRole] = useState("");
  const [user_id, Setuser_id] = useState("");
  const [showAll, setShowAll] = useState(true);
  const Navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reference to the container element
  const containerRef = useRef(null);

  useEffect(() => {
    const id = Cookies.get("user_id");
    Setuser_id(id);
   const body = {
    id
  }
  axios.post("http://localhost:1200/api/Checkrole", body)
  .then(response => {
    // console.log(response.data); 
    Cookies.set("role", response.data);
  })
  .catch(error => {
    console.error('Error:', error); 
  });
  const token = Cookies.get("token");
  const type = Cookies.get("role");
  setRole(type);
  setTtoken(token);
  axios.get("http://localhost:1200/api/is-verify", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((response) => {
        // console.log(response.role);
        setVerify(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        Navigate("/");
      });
  }, []);

  useEffect(() => {
    if (verify) {
      fetchData();
    }
  }, [verify]);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      // Scroll to the container element when it mounts
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:1200/api/getdata");
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cuisines = [
    { name: "North Indian", filter: "North Indian" },
    { name: "Continental", filter: "Continental" },
    { name: "Chinese", filter: "Chinese" },
    { name: "Japanese", filter: "Japanese" },
    { name: "Italian", filter: "Italian" },
  ];

  return (
    <>
      <div>
        <div className="dashboard-container overflow-y-auto">
          <Header />
          <Search allRecipe={setShowAll} setData={setData} />

          {isLoading ? (
            <div className="loader-container">
              <div className="loader">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            </div>
          ) : (
            cuisines
              .filter((cuisine) =>
                data.some((item) => item.cuisine === cuisine.filter)
              )
              .map((cuisine) => (
                <div key={cuisine.name} ref={containerRef}>
                  <Container cuisineName={`${cuisine.name}`}>
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
                </div>
              ))
          )}
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </>
  );
}
