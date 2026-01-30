import React from "react";
import {
  getAreas,
  getCategories,
  getRecipeOfTheDay,
} from "../../../../actions/mealdb.actions";

const DashboardPage = async () => {
  const recipeData = await getRecipeOfTheDay();
  const categoriesData = await getCategories();
  const areaData = await getAreas();

  const recipeOfTheDay = recipeData?.recipe;
  const categories = categoriesData?.categories || [];
  const area = areaData?.areas || [];

  return (
    <div className="py-16 px-4 bg-stone-50 min-h-screen">DashboardPage</div>
  );
};

export default DashboardPage;
