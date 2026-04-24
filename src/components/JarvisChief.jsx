import React, { useState } from "react";
import { askJarvis } from "../utils/askJarvis.js";
const JarvisChief = () => {
  const [recipeMessage, setRecipeMessage] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleInputChange = (e) => {
    setRecipeMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res_recipe = await askJarvis(recipeMessage);
    setRecipe(res_recipe)
  };

  return (
    <>
      <h1>Ask your recipes</h1>
      <form>
        <input
          type="text"
          value={recipeMessage}
          onChange={handleInputChange}
          placeholder="ask your favriot recipes"
        />
        <button onClick={handleSubmit}>ask</button>
      </form>
      <pre>{recipe}</pre>
    </>
  );
};

export default JarvisChief;
