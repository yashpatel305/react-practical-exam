import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000/recipes";

// Async thunks
export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addRecipe = createAsyncThunk("recipes/addRecipe", async (recipe) => {
  const res = await axios.post(API_URL, recipe);
  return res.data;
});

export const updateRecipe = createAsyncThunk("recipes/updateRecipe", async (recipe) => {
  const res = await axios.put(`${API_URL}/${recipe.id}`, recipe);
  return res.data;
});

export const deleteRecipe = createAsyncThunk("recipes/deleteRecipe", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const recipeSlice = createSlice({
  name: "recipes",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addRecipe.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.items.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter(r => r.id !== action.payload);
      });
  }
});

export default recipeSlice.reducer;
