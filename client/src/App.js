import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Container from "./components/Container";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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
    { name: "north Indian", filter: "north Indian" },
    { name: "Continental", filter: "Continental" },
    { name: "Chinese", filter: "Chinese" },
    { name: "Japanese", filter: "Japanese" },
    { name: "Italian", filter: "Italian" },
  ];

  return (
    <div className="App">
      <Header />
      <Search />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        cuisines.map((cuisine) => (
          <Container key={cuisine.name} cuisineName={`${cuisine.name} Cuisine`}>
            {data
              .filter((item) => item.cuisine === cuisine.filter)
              .map((item, index) => (
                <Card
                  key={index}
                  foodName={item.name}
                  imageUrl={item.image}
                  timeTaken={`${item.total_time} mins`}
                  id={item.id}
                />
              ))}
          </Container>
        ))
      )}
      <Footer />
    </div>
  );
}

export default App;
