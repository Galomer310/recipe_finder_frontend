import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes, addSavedRecipe } from "../redux/slices/recipesSlice";
import { RootState } from "../redux/store";

const sensitivitiesList = ["Gluten Free", "Dairy Free", "Vegetarian", "Vegan"];

const SearchRecipes = () => {
  const [ingredients, setIngredients] = useState("");
  const [selectedSensitivities, setSelectedSensitivities] = useState<string[]>(
    []
  );
  const [additionalLimit, setAdditionalLimit] = useState(0);
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const token = useSelector((state: RootState) => state.auth.token);

  const toggleSensitivity = (sensitivity: string) => {
    setSelectedSensitivities((prev) =>
      prev.includes(sensitivity)
        ? prev.filter((s) => s !== sensitivity)
        : [...prev, sensitivity]
    );
  };

  const handleSearch = async () => {
    if (!ingredients) {
      alert("Please enter at least one ingredient.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipes/search`,
        {
          ingredients: ingredients.split(",").map((item) => item.trim()),
          sensitivities: selectedSensitivities,
          additional: additionalLimit > 0,
          additionalLimit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setRecipes(response.data));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSaveRecipe = async (recipe: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipes/save`,
        {
          title: recipe.title,
          imageUrl: recipe.imageUrl,
          sourceUrl: recipe.sourceUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(addSavedRecipe(response.data));
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div>
      <h2>Find Recipes</h2>
      <div>
        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          placeholder="e.g., chicken, tomato, basil"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <div>
        <label>Dietary Sensitivities:</label>
        <div>
          {sensitivitiesList.map((sensitivity) => (
            <button
              key={sensitivity}
              onClick={() => toggleSensitivity(sensitivity)}
              style={{
                margin: "5px",
                padding: "8px",
                backgroundColor: selectedSensitivities.includes(sensitivity)
                  ? "#28a745"
                  : "#ddd",
                color: selectedSensitivities.includes(sensitivity)
                  ? "white"
                  : "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {sensitivity}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>Additional Ingredients Allowed:</label>
        <input
          type="number"
          min="0"
          value={additionalLimit}
          onChange={(e) => setAdditionalLimit(parseInt(e.target.value))}
        />
      </div>

      <button
        onClick={handleSearch}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search Recipes
      </button>

      <div>
        <h3>Results:</h3>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <div className="recipesCards">
            {recipes.map((recipe, index) => (
              <div className="recipeCard" key={index}>
                <h4>{recipe.title}</h4>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  style={{ width: "100px", height: "100px" }}
                />
                <p>
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </a>
                </p>
                <button onClick={() => handleSaveRecipe(recipe)}>
                  Save Recipe
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRecipes;
