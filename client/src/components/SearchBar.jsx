import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: [],
    mealType: [],
    courseType: [],
    rating: "",
  });

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("search item", searchTerm);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: selectedFilters[filterType].includes(value)
        ? selectedFilters[filterType].filter((filter) => filter !== value)
        : [...selectedFilters[filterType], value],
    });
  };
  const handleApplyFilters = () => {
    console.log("Selected Filters:", selectedFilters);

    toggleSidebar();
  };

  const handleCancelFilters = () => {
    setSelectedFilters({
      cuisine: [],
      mealType: [],
      courseType: [],
      rating: [],
    });
    // Close the sidebar
    toggleSidebar();
  };
  return (
    <div
      className="flex justify-end items-center mt-4 mb-4 mr-4"
      style={{ marginTop: "50px" }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="What are you looking to cook today..."
          value={searchTerm}
          onChange={handleChange}
          className="w-96 px-15 py-2 rounded-lg text-primary-300 bg-textbg focus:outline-none ml-[-20px] border-none drop-shadow-xl shadow-primary-300/50"
          style={{ width: "700px" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-6 absolute right-6 top-1/2 ml-5 mt-1.5 transform -translate-y-1/2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 100 10 5 5 0 000-10zM0 8a8 8 0 1114.23 4.77l5.72 5.73-1.41 1.41-5.73-5.72A8 8 0 010 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* Filter Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 ml-8 mt-2 text-white bg-primary-300 rounded-md"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={toggleSidebar}
      >
        <path
          fillRule="evenodd"
          d="M5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM5 12a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {sidebarVisible && (
        <div
          className="fixed top-0 right-0 h-full  w-80 bg-white z-10 rounded-lg drop-shadow-2xl overflow-y-auto"
          style={{ marginTop: "40px" }}
        >
          <div className="text-primary-300 p-4">
            <h4 className="text-lg font-semibold font-open-sans">Filters</h4>
            {/* Cuisine */}
            <div className="mb-4">
              <h6 className="text-sm font-semibold mb-1 ml-0 mr-12 mt-[-2rem] flex flex-start">
                Cuisine
              </h6>

              <ul className="list-none pl-0 ">
                <div className="grid grid-cols-2 mt-[-2rem]">
                  <li>
                    <input
                      className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg cursor-pointer hover:cursor-pointer"
                      type="checkbox"
                      id="cuisine1"
                      name="cuisine1"
                      value="Italian"
                      checked={selectedFilters.cuisine.includes("Italian")}
                      onChange={() => handleFilterChange("cuisine", "Italian")}
                    />
                    <label
                      htmlFor="cuisine1"
                      className="text-base cursor-pointer hover:cursor-pointer "
                    >
                      Italian
                    </label>
                  </li>
                  <li>
                    <input
                      className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                      type="checkbox"
                      id="cuisine2"
                      name="cuisine2"
                      value="Mexican"
                      checked={selectedFilters.cuisine.includes("Mexican")}
                      onChange={() => handleFilterChange("cuisine", "Mexican")}
                    />
                    <label
                      htmlFor="cuisine2"
                      className="text-base cursor-pointer hover:cursor-pointer"
                    >
                      Mexican
                    </label>
                  </li>
                  <li>
                    <input
                      className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                      type="checkbox"
                      id="cuisine3"
                      name="cuisine3"
                      value="Continental"
                      checked={selectedFilters.cuisine.includes("Continental")}
                      onChange={() =>
                        handleFilterChange("cuisine", "Continental")
                      }
                    />
                    <label
                      htmlFor="cuisine3"
                      className="text-base cursor-pointer hover:cursor-pointer"
                    >
                      Continental
                    </label>
                  </li>
                  <li>
                    <input
                      className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                      type="checkbox"
                      id="cuisine4"
                      name="cuisine4"
                      value="Chinese"
                      checked={selectedFilters.cuisine.includes("Chinese")}
                      onChange={() => handleFilterChange("cuisine", "Chinese")}
                    />
                    <label
                      htmlFor="cuisine4"
                      className="text-base cursor-pointer hover:cursor-pointer"
                    >
                      Chinese
                    </label>
                  </li>
                  <li>
                    <input
                      className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                      type="checkbox"
                      id="cuisine5"
                      name="cuisine5"
                      value="Japanese"
                      checked={selectedFilters.cuisine.includes("Japanese")}
                      onChange={() => handleFilterChange("cuisine", "Japanese")}
                    />
                    <label
                      htmlFor="cuisine5"
                      className="text-base cursor-pointer hover:cursor-pointer"
                    >
                      Japanese
                    </label>
                  </li>
                  <li>
                    <input
                      className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                      type="checkbox"
                      id="cuisine6"
                      name="cuisine6"
                      value="North Indian"
                      checked={selectedFilters.cuisine.includes("North Indian")}
                      onChange={() =>
                        handleFilterChange("cuisine", "North Indian")
                      }
                    />
                    <label
                      htmlFor="cuisine6"
                      className="text-base text-primary-300 cursor-pointer hover:cursor-pointer"
                    >
                      North Indian
                    </label>
                  </li>
                </div>
              </ul>
            </div>
            {/* Meal Type */}
            <div className="mb-4">
              <h6 className="text-sm font-semibold mb-1 ml-0 mr-12 mt-[-1rem] flex flex-start">
                Meal Type
              </h6>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="mealType1"
                    name="mealType1"
                    value="Veg"
                    checked={selectedFilters.mealType.includes("Veg")}
                    onChange={() => handleFilterChange("mealType", "Veg")}
                  />
                  <label
                    htmlFor="mealType1"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Veg
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="mealType2"
                    name="mealType2"
                    value="Non-veg"
                    checked={selectedFilters.mealType.includes("Non-veg")}
                    onChange={() => handleFilterChange("mealType", "Non-veg")}
                  />
                  <label
                    htmlFor="mealType2"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Non-veg
                  </label>
                </div>
              </div>
            </div>
            {/* Course Type */}
            <div className="mb-4">
              <h6 className="text-sm font-semibold mb-1 ml-0 mr-12 flex flex-start mt-[-0.5rem]">
                Course Type
              </h6>
              <div className="grid grid-cols-2">
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="courseType1"
                    name="courseType1"
                    value="Starter"
                    checked={selectedFilters.courseType.includes("Starter")}
                    onChange={() => handleFilterChange("courseType", "Starter")}
                  />
                  <label
                    htmlFor="courseType1"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Starter
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="courseType2"
                    name="courseType2"
                    value="Main Course"
                    checked={selectedFilters.courseType.includes("Main Course")}
                    onChange={() =>
                      handleFilterChange("courseType", "Main Course")
                    }
                  />
                  <label
                    htmlFor="courseType2"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Main Course
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="courseType3"
                    name="courseType3"
                    value="Dinner"
                    checked={selectedFilters.courseType.includes("Dinner")}
                    onChange={() => handleFilterChange("courseType", "Dinner")}
                  />
                  <label
                    htmlFor="courseType3"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Dinner
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="courseType4"
                    name="courseType4"
                    value="Snack"
                    checked={selectedFilters.courseType.includes("Snack")}
                    onChange={() => handleFilterChange("courseType", "Snack")}
                  />
                  <label
                    htmlFor="courseType4"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Snack
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="courseType5"
                    name="courseType5"
                    value="Breakfast"
                    checked={selectedFilters.courseType.includes("Breakfast")}
                    onChange={() =>
                      handleFilterChange("courseType", "Breakfast")
                    }
                  />
                  <label
                    htmlFor="courseType5"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Breakfast
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="courseType6"
                    name="courseType6"
                    value="Dessert"
                    checked={selectedFilters.courseType.includes("Dessert")}
                    onChange={() => handleFilterChange("courseType", "Dessert")}
                  />
                  <label
                    htmlFor="courseType6"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    Dessert
                  </label>
                </div>
              </div>
              {/* Rating */}
              <div>
                <h6 className="text-sm font-semibold mb-1 ml-0 mr-12 flex flex-start mt-[1rem]">
                  Rating
                </h6>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="rating1"
                    name="rating1"
                    value="4"
                    checked={selectedFilters.rating.includes("4")}
                    onChange={() => handleFilterChange("rating", "4")}
                  />
                  <label
                    htmlFor="rating1"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    4⭐ & above
                  </label>
                </div>
                <div>
                  <input
                    className="text-sm mt-[0.5rem] h-3 w-3 ml-1 mr-2 border  rounded-lg"
                    type="checkbox"
                    id="rating2"
                    name="rating2"
                    value="3"
                    checked={selectedFilters.rating.includes("3")}
                    onChange={() => handleFilterChange("rating", "3")}
                  />
                  <label
                    htmlFor="rating2"
                    className="text-base cursor-pointer hover:cursor-pointer"
                  >
                    3⭐ & above
                  </label>
                </div>

                {/* Add more rating options */}
              </div>
            </div>
            <div className="flex justify-center gap-5 mb-8 p-4">
              <button
                className="px-4 py-2 mr-2 bg-gray-300 text-primary-300 rounded-md hover:bg-primary-600 focus:outline-none"
                onClick={handleCancelFilters}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary-300 text-gray-300 rounded-md hover:bg-gray-500 focus:outline-none"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
