import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipes") // JSON Server
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🍲 Indian Vegetarian Recipes</h2>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted">
                  <strong>Chef:</strong> {recipe.chef}
                </p>
                <p className="card-text">
                  <i className="bi bi-clock"></i> {recipe.duration}
                </p>
                <div className="mb-2">
                  {recipe.tags?.map((tag, index) => (
                    <span key={index} className="badge bg-success me-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="card-text">{recipe.description}</p>
                <div className="mt-auto">
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="btn btn-primary w-100"
                  >
                    {recipe.cta || "See Complete Recipe"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
