

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import heroVideo from "../assets/video.mp4";
function LandingPage() {
    const [mainRecipe, setMainRecipe] = useState(null);
    const [featuredRecipes, setFeaturedRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/db.json")
            .then(res => res.json())
            .then(data => {
                if (data.recipes && data.recipes.length > 0) {
                    setMainRecipe(data.recipes[0]);
                    setFeaturedRecipes(data.recipes.slice(0, 3));
                }
            });
    }, []);

    return (
        <>

                        <section className="hero d-flex align-items-center justify-content-center position-relative" style={{ minHeight: "80vh", overflow: "hidden" }}>
                                        <video
                                            className="hero-bg-video position-absolute w-100 h-100"
                                            style={{ objectFit: "cover", left: 0, top: 0, zIndex: 0 }}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            src={heroVideo}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                            <div className="hero-content w-100 text-center position-relative" style={{ zIndex: 2 }}>
                                <h1 className="display-4 fw-bold mb-3" style={{ color: "#fff", letterSpacing: "1px" }}>
                                    Unlock the Flavors of the World
                                </h1>
                                <p className="lead mb-4" style={{ color: "#f8f9fa", fontSize: "1.35rem" }}>
                                    Your personal vault of recipes—saved, shared, and always within reach.
                                </p>
                                <Link to="/recipes">
                                    <button className="explore-btn" style={{ padding: "1rem 2.5rem", fontSize: "1.25rem", borderRadius: "2rem", boxShadow: "0 2px 16px 0 rgba(25,135,84,0.13)" }}>
                                        Start Cooking
                                    </button>
                                </Link>
                            </div>
                        </section>

        {/* Features Section */}

        <section className="feature-wrap">
            <div className="feature-left">
                <div className="feature-item">
                    <div className="icon-round">
                        <span className="ico user" aria-hidden="true" />
                    </div>
                    <div className="text">
                        <h3>Built for Home Cooks</h3>
                        <p>
                            Simple workflows and trustworthy guidance so dinner feels effortless and fun.
                        </p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="icon-round">
                        <span className="ico globe" aria-hidden="true" />
                    </div>
                    <div className="text">
                        <h3>Global Inspiration</h3>
                        <p>
                            Explore diverse cuisines and fresh ideas that spark creativity in your kitchen.
                        </p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="icon-round">
                        <span className="ico heart" aria-hidden="true" />
                    </div>
                    <div className="text">
                        <h3>Joyful Community</h3>
                        <p>
                            Share wins, trade tips, and celebrate cooking together one great meal at a time.
                        </p>
                    </div>
                </div>
            </div>

            <aside className="feature-right">
                <div className="media">
                    <img
                        src="https://content.jdmagicbox.com/comp/ahmedabad/b4/079pxx79.xx79.200115093511.i8b4/catalogue/mohanjithal-gujarati-thali-chandkheda-ahmedabad-4mq1j4g0al.jpg"
                        alt="Plated assorted dishes"
                        className="hero-img"
                    />
                </div>

                <div className="player">
                    <Link className="see-recipe" href="" aria-label="See recipe" to="/recipes">
                        See Recipe
                    </Link>
                </div>
            </aside>
        </section>

        {/* Featured Recipe Section */}

                <header className="tacos-hero">
                    {/* Background image layer */}
                    <div className="tacos-hero__bg" aria-hidden="true" />

                    {/* Content block */}
                    {featuredRecipes[1] && (
                        <div className="tacos-hero__content">
                            <h1 className="tacos-hero__title">
                                {featuredRecipes[1].title}
                            </h1>
                            <p className="tacos-hero__subtitle">
                                {featuredRecipes[1].description}
                            </p>
                            <div className="tacos-hero__meta">
                                <div className="meta-item">
                                    <span className="dot clock" aria-hidden="true" />
                                    <span>{featuredRecipes[1].duration}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="dot chef" aria-hidden="true" />
                                    <span>{featuredRecipes[1].chef}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Floating action buttons (bottom-right) */}
                    {featuredRecipes[1] && (
                        <div className="tacos-hero__float">
                            <button
                                className="float-btn"
                                onClick={() => navigate(`/recipes/${featuredRecipes[1].id}`)}
                            >
                                <span className="dot cart" aria-hidden="true" />
                                See Details
                            </button>
                        </div>
                    )}
                </header>

        {/* Popular Recipes Section */}

        <section className="popular-wrap">
            <div className="popular-head">
                <h2 className="popular-title">
                    Trending <span className="accent">Recipes</span> Today
                </h2>
                <Link className="more-pill" to="/recipes">See More Recipes</Link>
            </div>

            <div className="card-grid">
                {featuredRecipes.map((recipe, index) => (
                    <article className="recipe-card" key={index}>
                        <h3 className="card-title">{recipe.title}</h3>
                        <div className="image-wrap">
                            <img src={recipe.image} alt={recipe.title} loading="lazy" />
                            <div className="hover-layer">
                                <div className="hover-copy">
                                    <h4 className="hover-title">{recipe.title}</h4>
                                    <p className="hover-sub">{recipe.description}</p>
                                    <div className="hover-chips">
                                        {recipe.tags && recipe.tags.map((tag, i) => (
                                            <span className="chip" key={i}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="cta-bar"
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                        >
                            <span>See Complete Recipe</span>
                            <span className="cta-icon" aria-hidden="true" />
                        </button>
                    </article>
                ))}
            </div>
        </section>
        </>
    );
}

export default LandingPage;
