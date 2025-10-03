import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => setRecipe(data))
            .catch((err) => console.error("Error fetching recipe:", err));
    }, [id]);

    if (!recipe) return <p className="text-center mt-5">Loading recipe...</p>;

    return (
        <main className="container mt-4">
            <article className="recipe-grid">
                {/* Top Row: Title, Description, Image, Tags, Chef */}
                <header className="recipe-grid-header">
                    <div className="recipe-title">
                        <h1 className="fw-bold mb-2 text-success">{recipe.title}</h1>
                        <div className="recipe-desc mt-3">
                            <h2 className="h5 fw-bold mb-2">Description</h2>
                            <p className="mb-3">{recipe.description}</p>
                            <div className="mb-2">
                                {recipe.tags?.map((tag, idx) => (
                                    <span key={idx} className="badge bg-success me-1 mb-1">{tag}</span>
                                ))}
                            </div>
                            <div className="chef-name text-muted mb-2">
                                <strong>Chef:</strong> {recipe.chef}
                            </div>
                            {recipe.duration && (
                                <div className="prep-time text-muted mb-2">
                                    <strong>Prep Time:</strong> {recipe.duration}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="recipe-meta">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="recipe-img recipe-img-lg mb-2"
                        />
                    </div>
                </header>
                {/* Ingredients left, Steps right */}
                <section className="recipe-grid-main">
                    <div className="recipe-details-col">
                        <section className="mb-4">
                            <h2 className="h5 fw-bold mb-2">📝 Ingredients</h2>
                            <ul className="list-unstyled recipe-list">
                                {recipe.ingredients?.map((item, idx) => (
                                    <li key={idx} className="recipe-list-item">{item}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                    <div className="recipe-details-col">
                        <section>
                            <h2 className="h5 fw-bold mb-2">👨‍🍳 Steps</h2>
                            <ol className="recipe-list-numbered">
                                {recipe.steps?.map((step, idx) => (
                                    <li key={idx} className="recipe-list-item">{step}</li>
                                ))}
                            </ol>
                        </section>
                    </div>
                </section>
                <footer className="mt-4">
                    <Link to="/recipes" className="btn btn-secondary me-2">
                        ← Back to Recipes
                    </Link>
                    <Link to={`/recipes/${recipe.id}/edit`} className="btn btn-warning">
                        ✏️ Edit Recipe
                    </Link>
                </footer>
            </article>
        </main>
    );
};

export default RecipeDetails;
