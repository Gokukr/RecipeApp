// filter.js

const applyFilters = (data, filterOptions) => {
  let filteredData = data;

  // Apply filter for meal type
  if (filterOptions.meal_type) {
    filteredData = filteredData.filter(
      (recipe) => recipe.meal_type === filterOptions.meal_type
    );
    console.log(filteredData);
  }

  // Apply filter for course
  if (filterOptions.course_type) {
    // Changed from course to course_type
    filteredData = filteredData.filter(
      (recipe) => recipe.course_type === filterOptions.course_type // Changed from course to course_type
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
