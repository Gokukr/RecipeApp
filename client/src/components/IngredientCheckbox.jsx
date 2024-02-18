import React from "react";

const IngredientCheckbox = ({ ingredient, isChecked, onChange }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mb-4">
      <label className="flex items-center space-x-2 block w-full py-1.5 text-gray-900 focus:ring-2 sm:text-sm sm:leading-6">
        <input
          type="checkbox"
          id={ingredient.id}
          name="ingredients"
          value={ingredient.ingredient_name}
          checked={isChecked}
          onChange={onChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span>{ingredient.ingredient_name}</span>
      </label>
    </div>
  );
};

export default IngredientCheckbox;
