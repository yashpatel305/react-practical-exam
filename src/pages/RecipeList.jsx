import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../redux/recipeSlice";
import { useNavigate } from "react-router-dom";

export default function RecipeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: recipes, status, error } = useSelector((state) => state.recipes);
  const [activeCat, setActiveCat] = useState("All Types");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Categories
  const categories = React.useMemo(() => {
    const all = new Set(["All Types"]);
    recipes.forEach(r => ((r.tags && r.tags.length) ? r.tags : [r.category])
      .filter(Boolean)
      .forEach(t => all.add(t)));
    return Array.from(all);
  }, [recipes]);


  // Sorting
  const sortedRecipes = useMemo(() => {
    let sorted = [...recipes];
    if (sortBy === "name") {
      sorted.sort((a, b) => sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title));
    } else if (sortBy === "date") {
      sorted.sort((a, b) => sortOrder === "asc"
        ? new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        : new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    return sorted;
  }, [recipes, sortBy, sortOrder]);

  // Filtering
  const visible = useMemo(() => {
    if (activeCat === "All Types") {
      // Always show up to 10 recipes if available
      return sortedRecipes.length >= 10 ? sortedRecipes.slice(0, 10) : sortedRecipes;
    }
    return sortedRecipes.filter(r =>
      ((r.tags && r.tags.length) ? r.tags : [r.category]).includes(activeCat)
    );
  }, [sortedRecipes, activeCat]);

  // Handle Delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    dispatch(deleteRecipe(id));
  };

  // Handle Edit
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Render
  if (status === "loading") return <div className="state">Loading…</div>;
  if (error) return <div className="state error">Failed: {error}</div>;

  return (
    <>
      <section 
        className="culinary-banner-gradient py-5 mb-4 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #198754 60%, #43c59e 100%)',
          minHeight: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 0 2rem 2rem',
          boxShadow: '0 2px 16px 0 rgba(25,135,84,0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Animated background particles */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h2 className="display-5 fw-bold text-white mb-0">Explore the Vault of Delicious Recipes</h2>
        </div>
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </section>

      <section className="what-to-cook container pb-5">
        <h2 className="section-title mb-4 text-success fw-bold">What to Cook?</h2>

        {/* Sorting and Filtering Controls */}
        <div className="d-flex flex-wrap align-items-center mb-3 gap-2">
          <div className="filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${activeCat === cat ? "active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ms-auto d-flex align-items-center gap-2">
            <label className="form-label mb-0 me-1" style={{ whiteSpace: "nowrap" }}>Sort by:</label>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-1">
              <select className="form-select form-select-sm" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="date">Date Added</option>
              </select>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setSortOrder(o => o === "asc" ? "desc" : "asc")}>{sortOrder === "asc" ? "↑" : "↓"}</button>
            </div>
          </div>
        </div>

  <div className="row g-4 flex-wrap-overflow-fix">
          {visible.map(card => (
            <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card h-100 shadow-sm border-0 recipe-card-hover"
                style={{ cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onClick={() => navigate(`/recipes/${card.id}`)}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                <img src={card.image} alt={card.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} loading="lazy" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-success">{card.title}</h5>
                  <p className="card-text text-muted mb-1">
                    <small>{card.author ? `By ${card.author}` : "Discover tasty goodness"}</small>
                  </p>
                  <div className="mb-2">
                    {(card.tags || []).slice(0, 3).map((t, i) => (
                      <span className="badge bg-success me-1" key={i}>{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm flex-fill recipe-btn-hover"
                      style={{ transition: "background 0.2s, color 0.2s" }}
                      onClick={e => { e.stopPropagation(); handleEdit(card.id); }}
                    >Edit</button>
                    <button
                      className="btn btn-outline-danger btn-sm flex-fill recipe-btn-hover"
                      style={{ transition: "background 0.2s, color 0.2s" }}
                      onClick={e => { e.stopPropagation(); handleDelete(card.id); }}
                    >Delete</button>
                  </div>
                  <button
                    className="btn btn-success btn-sm mt-2 w-100 recipe-btn-hover"
                    style={{ transition: "background 0.2s, color 0.2s" }}
                    onClick={e => { e.stopPropagation(); navigate(`/recipes/${card.id}`); }}
                  >
                    {card.cta || "See Complete Recipe"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer is rendered globally in App.jsx */}


    </>
  );
}