import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { response } from 'express';

function Rating({ recipeId }) {
  const [selectedRating, setSelectedRating] = useState(0); // Adjust based on user's previous rating

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };
  const [initialAverageRating, setRating]=useState(null);
  const [total_ratings, setTotal]=useState(0);
  console.log(recipeId);
  useEffect(() => {
    axios.get(`http://localhost:1200/api/detail/recipes/${recipeId}`)
    .then((response) => {
      setRating(response.data.rating);
    });
      
  }, [recipeId]);

  useEffect(() => {
    axios.get(`http://localhost:1200/api/detail/recipes/${recipeId}`)
    .then((response) => {
      setTotal(response.data.count);
    });
      
  }, [recipeId]);
  
  // const total_ratings=2;
  const submitRating = async () => {
    const Rate = Number(total_ratings) * Number(initialAverageRating);
    console.log(total_ratings);
    console.log(initialAverageRating);
    const total = Number(total_ratings) + Number(1);
    // const total=3;
    // console.log(total);
    const newRating = (Rate+selectedRating)/(total);
    // console.log(newRating);
    axios.put(`http://localhost:1200/api/detail/recipe/update/${recipeId}/${newRating}/${total}`)
      .then(() => {
        console.log('Review Submitted');
      })
      .catch((error) => {
        console.error('Error in submitting review', error);
      });
  };

  const ratingStars = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-8 mb-2 text-lg font-medium">Rate this Recipe</h3>
      <div className="flex space-x-1">
        {ratingStars.map((rating) => (
          <span
          key={rating}
          onClick={() => handleRatingChange(rating)}
          className="cursor-pointer text-3xl hover:text-yellow-200"
        >
          <svg width="30" height="30">
            <circle
              cx="15"
              cy="15"
              r="10"
              fill={rating <= selectedRating ? "#FFFF00" : "#ffffff"}
            />
          </svg>
        </span>
        
        ))}
      </div>
      <p className="mt-5 text-sm">Selected Rating: {selectedRating}</p>
      <button
        onClick={submitRating}
        className="mt-4 bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit Rating
      </button>
    </div>
  );
}

export default Rating;
