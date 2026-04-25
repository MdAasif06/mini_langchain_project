import React, { useState,useEffect } from "react";
import { askJarvis } from "../utils/askJarvis.js";
const JarvisChief = () => {
  const [recipeMessage, setRecipeMessage] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setRecipeMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeMessage.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const res_recipe = await askJarvis(recipeMessage);
      setRecipe(res_recipe);
      localStorage.setItem("jarvis_output", JSON.stringify(res_recipe));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
  const saved = localStorage.getItem("jarvis_output");

  if (saved) {
    setRecipe(JSON.parse(saved));
  }
}, []);

  return (
    <main className="chef-page">
      <section className="chef-card">
        <p className="eyebrow">CookChief AI</p>
        <h1>Ask for any recipe</h1>
        <p className="subtitle">Describe a dish, ingredients, or a cooking style.</p>

        <form className="recipe-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={recipeMessage}
            onChange={handleInputChange}
            placeholder="Try: spicy paneer dinner in 20 minutes"
            aria-label="Recipe prompt"
          />
          <button type="submit" disabled={isLoading || !recipeMessage.trim()}>
            {isLoading ? "Cooking..." : "Get Recipe"}
          </button>
        </form>

        <section className="result-panel" aria-live="polite">
          <h2>Recipe Result</h2>
          {recipe ? (
            <pre>{recipe}</pre>
          ) : (
            <p className="result-placeholder">
              Your recipe will appear here with steps and tips.
            </p>
          )}
        </section>
      </section>
    </main>
  );
};

export default JarvisChief;
