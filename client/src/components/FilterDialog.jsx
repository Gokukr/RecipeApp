// import React, { useState } from "react";

// const FilterDialog = ({ onClose, onApply }) => {
//   const [filters, setFilters] = useState({
//     meal_type: "",
//     course_type: "",
//     cuisine: "",
//     minRating: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleApply = () => {
//     onApply(filters);

//     onClose();
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-darkslategray-300 p-6 rounded-md">
//         <h2 className="text-whitesmoke font-semibold mb-4">Filter Recipes</h2>
//         <div className="mb-4">
//           <label className="block mb-1 text-whitesmoke font-open-sans">
//             Meal Type:
//           </label>
//           <select
//             name="meal_type"
//             value={filters.meal_type}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-2 py-1"
//           >
//             <option value="">All</option>
//             <option value="Veg">Veg</option>
//             <option value="Non-Veg">Non-Veg</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-whitesmoke font-open-sans">
//             Course:
//           </label>
//           <select
//             name="course_type"
//             value={filters.course_type}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-2 py-1"
//           >
//             <option value="">All</option>
//             <option value="Starter">Starter</option>
//             <option value="Main Course">Main Course</option>
//             <option value="Dessert">Dessert</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-whitesmoke font-open-sans">
//             Cuisine:
//           </label>
//           <select
//             name="cuisine"
//             value={filters.cuisine}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-2 py-1"
//           >
//             <option value="">All</option>
//             <option value="North Indian">North Indian</option>
//             <option value="Italian">Italian</option>
//             <option value="Chinese">Chinese</option>
//             <option value="Continental">Continental</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-whitesmoke font-open-sans">
//             Minimum Rating:
//           </label>
//           <input
//             type="number"
//             name="minRating"
//             value={filters.minRating}
//             onChange={handleChange}
//             min="0"
//             max="5"
//             step="0.1"
//             className="border border-gray-300 rounded-md px-2 py-1"
//           />
//         </div>
//         <div className="flex justify-between">
//           <button
//             onClick={handleApply}
//             className="bg-whitesmoke text-darkslategray-300 px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Apply
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-300 text-darkslategray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterDialog;
import React, { useState } from 'react';

const Sidebar = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    cuisines: [],
    mealType: '',
    courseType: '',
    rating: 0
  });

  const handleCuisineChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        cuisines: [...prevFilters.cuisines, value]
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        cuisines: prevFilters.cuisines.filter((cuisine) => cuisine !== value)
      }));
    }
  };

  const handleMealTypeChange = (e) => {
    setFilters({ ...filters, mealType: e.target.value });
  };

  const handleCourseTypeChange = (e) => {
    setFilters({ ...filters, courseType: e.target.value });
  };

  const handleRatingChange = (e) => {
    setFilters({ ...filters, rating: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(filters);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Cuisines</h2>
          <div>
            <label className="inline-flex items-center mr-4">
              <input type="checkbox" value="North Indian" onChange={handleCuisineChange} />
              <span className="ml-2">North Indian</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input type="checkbox" value="Continental" onChange={handleCuisineChange} />
              <span className="ml-2">Continental</span>
            </label>
            {/* Add more cuisine checkboxes as needed */}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Meal Type</h2>
          <select className="w-full p-2 border rounded" value={filters.mealType} onChange={handleMealTypeChange}>
            <option value="">Select</option>
            <option value="Veg">Veg</option>
            <option value="Non Veg">Non Veg</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Course Type</h2>
          <select className="w-full p-2 border rounded" value={filters.courseType} onChange={handleCourseTypeChange}>
            <option value="">Select</option>
            <option value="Dessert">Dessert</option>
            <option value="Starter">Starter</option>
            <option value="Snack">Snack</option>
            <option value="Main Course">Main Course</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Rating</h2>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.rating}
            onChange={handleRatingChange}
            className="w-full"
          />
          <span>{filters.rating}</span>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Sidebar;

