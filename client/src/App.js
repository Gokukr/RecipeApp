import React from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import Container from "./components/Container";
import data from "./data";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const cuisines = [
    { name: "North Indian", filter: "North Indian" },
    { name: "Continental", filter: "Continental" },
    { name: "Chinese", filter: "Chinese" },
    { name: "Japanese", filter: "Japanese" },
    { name: "Italian", filter: "Italian" },
  ];

  return (
    <div className="App">
      <Header />
      <Search />

      {cuisines.map((cuisine) => (
        <Container key={cuisine.name} cuisineName={`${cuisine.name} Cuisine`}>
          {data
            .filter((item) => item.cuisine === cuisine.filter)
            .map((item, index) => (
              <Card key={index} {...item} />
            ))}
        </Container>
      ))}
      <Footer />
    </div>
  );
}

export default App;
