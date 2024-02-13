// FilterDialog.js
import React, { useState } from "react";

const FilterDialog = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    mealType: "",
    course: "",
    cuisine: "",
    minRating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-darkslategray-300 p-6 rounded-md">
        <h2 className="text-whitesmoke font-semibold mb-4">Filter Recipes</h2>
        <div className="mb-4">
          <label className="block mb-1 text-whitesmoke font-open-sans">
            Meal Type:
          </label>
          <select
            name="mealType"
            value={filters.mealType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="">All</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-whitesmoke font-open-sans">
            Course:
          </label>
          <select
            name="course"
            value={filters.course}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="">All</option>
            <option value="Starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-whitesmoke font-open-sans">
            Cuisine:
          </label>
          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="">All</option>
            <option value="North Indian">North Indian</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Continental">Continental</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-whitesmoke font-open-sans">
            Minimum Rating:
          </label>
          <input
            type="number"
            name="minRating"
            value={filters.minRating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleApply}
            className="bg-whitesmoke text-darkslategray-300 px-4 py-2 rounded-md hover:bg-white-600"
          >
            Apply
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-darkslategray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;
