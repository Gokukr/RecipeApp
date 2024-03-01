import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const RecipeRequest = () => {

  const acceptRecipe = () => {
    try {
      // api
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRecipe = () => {
    try {
      // api
    } catch (error) {
      console.error(error);
    }
  }

  const RequestCard = ({image, culName, recipeName, cuisine, totalTime }) => (
    <div className="h-48 bg-primary-100 drop-shadow-sm hover:drop-shadow-2xl rounded-lg overflow-hidden item-center flex mr-4">
      <div  className="w-72 h-36 p-6 overflow-hidden">
      <div className="text-white">{recipeName}</div>
        <img src={image} className="w-full h-full rounded-lg object-cover"/>
      </div>
      <div className="text-white">
        {culName}
      </div>
      <div>
        <button onClick={acceptRecipe} className="text-base bg-blue-500 text-white px-4 py-1 rounded-md ml-4">
          Accept
        </button>
        <button onClick={rejectRecipe} className="text-base pl-1 bg-orange-500 text-white rounded-md">
          Reject
        </button>
      </div>
    </div>
  );
  return(
    <div>
      <Header/>
        <div className="p-16">
          <RequestCard
            image="https://static.toiimg.com/photo/52467119.cms"
            culName="Kishore"
            recipeName="Noodles"
            cuisine="Chinese"
            totalTime={2}
          />
        </div>
      <Footer/>
    </div>
  );
};

export default RecipeRequest;