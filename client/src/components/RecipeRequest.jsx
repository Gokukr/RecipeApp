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
  };

  const RequestCard = ({ image, culName, recipeName, cuisine, totalTime }) => (
    <div className="flex items-center w-8/12 bg-white hover:drop-shadow-2xl relative rounded-md">
      <div className="h-40 p-4 rounded-lg overflow-hidden flex flex-col mr-4 rounded-md">
        <img src={image} className="h-full w-48 rounded-md" alt="Recipe" />
      </div>
      <div className="p-10 text-xl font-semibold text-gray-900">{culName}</div>
      <div className="p-10">
        <div className="p-2 text-xl font-bold text-gray-900">
          Recipe Name: {recipeName}
        </div>
        <div className="p-2 text-base text-gray-700">Cuisine: {cuisine}</div>
        <div className="p-2 text-base text-gray-700">
          Total Time: {totalTime} hours
        </div>
      </div>
      <div className="ml-auto">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4">
          Accept
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-8">
          Reject
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="flex items-center w-screen justify-center py-16">
        <RequestCard
          image="https://static.toiimg.com/photo/52467119.cms"
          culName="Kishore"
          recipeName="Noodles"
          cuisine="Chinese"
          totalTime={2}
        />
      </div>
      <Footer />
    </div>
  );
};

export default RecipeRequest;
