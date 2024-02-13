// filter.js
const applyFilters = (data, filterOptions) => {
  let filteredData = data;

  // Apply filter for meal type
  if (filterOptions.mealType) {
    filteredData = filteredData.filter(
      (recipe) => recipe.mealType === filterOptions.mealType
    );
  }

  // Apply filter for course
  if (filterOptions.course) {
    filteredData = filteredData.filter(
      (recipe) => recipe.course === filterOptions.course
    );
  }

  // Apply filter for cuisine
  if (filterOptions.cuisine) {
    filteredData = filteredData.filter(
      (recipe) => recipe.cuisine === filterOptions.cuisine
    );
  }

  // Apply filter for ratings
  filteredData = filteredData.filter(
    (recipe) => recipe.rating >= filterOptions.minRating
  );

  return filteredData;
};

export default applyFilters;
