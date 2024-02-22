// const applyFilters = (data, filterOptions) => {
//   if (!Array.isArray(data) || typeof filterOptions !== "object") {
//     console.error("Invalid data or filter options.");
//     return [];
//   }

//   let filteredData = [...data];

//   try {
//     // Apply filter for meal type
//     if (filterOptions.meal_type) {
//       filteredData = filteredData.filter(
//         (recipe) => recipe.meal_type === filterOptions.meal_type
//       );
//     }

//     // Apply filter for course type
//     if (filterOptions.course_type) {
//       filteredData = filteredData.filter(
//         (recipe) => recipe.course_type === filterOptions.course_type
//       );
//     }

//     // Apply filter for cuisine
//     if (filterOptions.cuisine) {
//       filteredData = filteredData.filter(
//         (recipe) => recipe.cuisine === filterOptions.cuisine
//       );
//     }

//     // Apply filter for ratings
//     if (typeof filterOptions.minRating === "number") {
//       filteredData = filteredData.filter(
//         (recipe) => recipe.rating >= filterOptions.minRating
//       );
//     }
//   } catch (error) {
//     console.error("Error applying filters:", error);
//     return [];
//   }

//   return filteredData;
// };

// export default applyFilters;
