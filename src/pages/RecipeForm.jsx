import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../Api/client';

const RecipeSubmissionForm = () => {
  const { id } = useParams(); // Extract recipe ID from URL parameters
  const [recipeTitle, setRecipeTitle] = useState("");
  const [imagePreviewData, setImagePreviewData] = useState(""); // Base64 encoded image data
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [prepDuration, setPrepDuration] = useState("");
  const [createdByAuthor, setCreatedByAuthor] = useState("");
  const [chefName, setChefName] = useState("");
  const [tagList, setTagList] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [ingredientLines, setIngredientLines] = useState("");
  const [stepInstructions, setStepInstructions] = useState("");

  const navigateToPage = useNavigate();

  // Load existing recipe data when in edit mode
  useEffect(() => {
    if (id) {
      api.get(/recipes/)
        .then(res => {
          const recipeData = res.data;
          setRecipeTitle(recipeData.title);
          setImagePreviewData(recipeData.image);
          setPrepDuration(recipeData.duration);
          setCreatedByAuthor(recipeData.author);
          setChefName(recipeData.chef);
          setTagList((recipeData.tags || []).join(", "));
          setLongDescription(recipeData.description || "");
          setIngredientLines((recipeData.ingredients || []).join("\n"));
          setStepInstructions((recipeData.steps || []).join("\n"));
        })
        .catch(err => alert("Failed to load recipe data"));
    }
  }, [id]);

  // Convert selected image file to base64 for preview
  const handleImageFileSelection = (e) => {
    const file = e.target.files[0];
    setSelectedImageFile(file);

    const fileReader = new FileReader();
    fileReader.onloadend = () => setImagePreviewData(fileReader.result);
    if (file) fileReader.readAsDataURL(file);
  };

  const processFormSubmission = async (e) => {
    e.preventDefault();

    const recipePayload = {
      title: recipeTitle,
      image: imagePreviewData,
      duration: prepDuration,
      author: createdByAuthor,
      chef: chefName,
      tags: tagList.split(",").map(t => t.trim()).filter(Boolean),
      description: longDescription,
      ingredients: ingredientLines.split("\n").map(i => i.trim()).filter(Boolean),
      steps: stepInstructions.split("\n").map(s => s.trim()).filter(Boolean),
      cta: "See Complete Recipe"
    };

    try {
      if (id) {
        // Update existing recipe
        await api.put(/recipes/, recipePayload);
        alert("Recipe updated successfully!");
      } else {
        // Create new recipe
        await api.post("/recipes", recipePayload);
        alert("Recipe added successfully!");
      }
      navigateToPage("/recipes");
    } catch (error) {
      alert("Failed to submit recipe");
    }
  };

  return (
    <>
     <section className="rs-hero">
      <div className="rs-content">
        <h2>
          Recipe Submission Form
        </h2>
      </div>
    </section>
    <div className="container recipe-form-container mt-4 mb-5">
      <h2 className="mb-3">{id ? "Edit Recipe" : "Add Recipe"}</h2>
      <form onSubmit={processFormSubmission}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={handleImageFileSelection}
        />

        {/* Display image preview */}
        {imagePreviewData && <img src={imagePreviewData} alt="preview" style={{maxWidth:'200px', marginBottom:'10px'}} />}

        <input
          className="form-control mb-2"
          placeholder="Duration"
          value={prepDuration}
          onChange={(e) => setPrepDuration(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Author"
          value={createdByAuthor}
          onChange={(e) => setCreatedByAuthor(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Chef Name"
          value={chefName}
          onChange={(e) => setChefName(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Tags (comma separated)"
          value={tagList}
          onChange={(e) => setTagList(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Ingredients (one per line)"
          value={ingredientLines}
          onChange={(e) => setIngredientLines(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Steps (one per line)"
          value={stepInstructions}
          onChange={(e) => setStepInstructions(e.target.value)}
        />
        <button className="btn btn-success">{id ? "Update Recipe" : "Add Recipe"}</button>
      </form>
    </div>
    </>
  );
};

export default RecipeSubmissionForm;
