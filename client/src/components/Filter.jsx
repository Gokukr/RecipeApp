const applyFilters = (data, filterOptions) => {
  let filteredData = data;

  if (filterOptions.mealType && filterOptions.mealType.trim() !== "") {
    filteredData = filteredData.filter(
      (recipe) =>
        recipe.mealType.toLowerCase() === filterOptions.mealType.toLowerCase()
    );
  }

  if (filterOptions.course && filterOptions.course.trim() !== "") {
    filteredData = filteredData.filter(
      (recipe) =>
        recipe.course &&
        recipe.course.toLowerCase() === filterOptions.course.toLowerCase()
    );
  }

  if (filterOptions.cuisine && filterOptions.cuisine.trim() !== "") {
    filteredData = filteredData.filter(
      (recipe) =>
        recipe.cuisine.toLowerCase() === filterOptions.cuisine.toLowerCase()
    );
  }

  filteredData = filteredData.filter(
    (recipe) => recipe.rating >= filterOptions.minRating
  );

  return filteredData;
};

export default applyFilters;
