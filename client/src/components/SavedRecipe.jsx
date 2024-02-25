import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import RecipeContainer from "./RecipeContainer";
import { searchSavedRecipe } from "../api";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



function SavedRecipe() {
  const { userId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [searchText, setSearchText] =useState("");
  const [filter, setFilter] =useState({
    rating: [],
    mealType: [],
    course: [],
    cuisine: [],
  });
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() =>
  {
    const token = Cookies.get("token");
    axios
    .get("http://localhost:1200/api/is-verify", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
    .then((response) => {
      console.log(response.data);
      setVerify(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
      navigate("/");
    });
  },[])

  const getRecipes = async (id, text, filter) => {
    const res = await searchSavedRecipe(id, text, filter);
    setRecipes(res.data.rows);
  };

  const setItems = (txt, filter) => {
    setSearchText(txt);
    setFilter(filter);
  };

  useEffect(() => {
    if(verify) {
    getRecipes(userId, searchText, filter);
    }
  }, [userId, searchText, filter,verify]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Header />
      <div>
        <div className="flex-1 flex flex-col items-center justify-center gap-26 max-w-full text-center text-13xl text-primary-100 font-open-sans">
          {/* <div className="inline-block mq450:text-lgi mq750:text-7xl mt-8">
            <h1>Saved Recipes</h1>
          </div> */}
          <SearchBar
            onSearch={setItems}
            allRecipe={setShowAll}
            placeholder={"Search aved Recipes..."}
          />
        </div>
        <RecipeContainer data={recipes} />
      </div>
      <Footer />
    </div>
  );
}

export default SavedRecipe;
