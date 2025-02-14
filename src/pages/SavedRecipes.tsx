import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSavedRecipes } from "../redux/slices/recipesSlice";
import { RootState } from "../redux/store";

const SavedRecipes = () => {
  const dispatch = useDispatch();
  const savedRecipes = useSelector(
    (state: RootState) => state.recipes.savedRecipes
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/recipes/saved`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        dispatch(setSavedRecipes(response.data));
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [dispatch, token]);

  const handleDeleteRecipe = async (id: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/recipes/saved/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update Redux state to remove the deleted recipe
      dispatch(
        setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== id))
      );
    } catch (error) {
      console.error("Error deleting saved recipe:", error);
    }
  };

  return (
    <div>
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        savedRecipes.map((recipe, index) => (
          <div className="saved-recipe-card" key={index}>
            <h4>{recipe.title}</h4>
            <img
              className="saved-recipe-image"
              src={recipe.imageUrl}
              alt={recipe.title}
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
            <button
              className="delete-button"
              onClick={() => handleDeleteRecipe(recipe.id)}
            >
              Delete Recipe
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedRecipes;
