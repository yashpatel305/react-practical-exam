import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    duration: "",
    chef: "",
    tags: "",
    description: "",
    ingredients: "",
    steps: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert tags, ingredients, steps to arrays
    const newRecipe = {
      ...recipe,
      tags: recipe.tags.split(",").map((tag) => tag.trim()),
      ingredients: recipe.ingredients.split("\n").map((item) => item.trim()),
      steps: recipe.steps.split("\n").map((step) => step.trim())
    };

    try {
      await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe)
      });

      alert("✅ Recipe added successfully!");
      navigate("/recipes"); // Redirect back to recipe list
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("❌ Failed to add recipe");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">➕ Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Duration</label>
            <input
              type="text"
              name="duration"
              value={recipe.duration}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., 20 min"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Chef</label>
            <input
              type="text"
              name="chef"
              value={recipe.chef}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={recipe.tags}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Main Courses, Healthy Eats"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Steps (one per line)</label>
          <textarea
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
