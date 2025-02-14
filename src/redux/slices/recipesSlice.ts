import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
    id: number;
    title: string;
    imageUrl: string;
    sourceUrl: string;
}

interface RecipesState {
    recipes: Recipe[];
    savedRecipes: Recipe[]; // Ensure savedRecipes is defined correctly
}

const initialState: RecipesState = {
    recipes: [],
    savedRecipes: [],
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.recipes = action.payload;
        },
        setSavedRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.savedRecipes = action.payload;
        },
        addSavedRecipe: (state, action: PayloadAction<Recipe>) => {
            state.savedRecipes.push(action.payload);
        },
    },
});

export const { setRecipes, setSavedRecipes, addSavedRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
