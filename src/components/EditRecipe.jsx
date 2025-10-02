import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams(); // recipe ID from URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch existing recipe data
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Convert arrays back to string (for textarea/inputs)
        setRecipe({
          ...data,
          tags: data.tags?.join(", ") || "",
          ingredients: data.ingredients?.join("\n") || "",
          steps: data.steps?.join("\n") || ""
        });
      })
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...recipe,
      tags: recipe.tags.split(",").map((tag) => tag.trim()),
      ingredients: recipe.ingredients.split("\n").map((i) => i.trim()),
      steps: recipe.steps.split("\n").map((s) => s.trim())
    };

    try {
      await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe)
      });

      alert("✅ Recipe updated successfully!");
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("❌ Failed to update recipe");
    }
  };

  if (!recipe) return <p className="text-center mt-5">Loading recipe...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">✏️ Edit Recipe</h2>
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
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
