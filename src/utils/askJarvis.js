import { ChatGroq } from "@langchain/groq";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";



export const askJarvis = async (recipeMessage) => {
  // console.log(recipeMessage)
  const SECRET_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const chat = new ChatGroq({
    apiKey: SECRET_KEY,
    model: "openai/gpt-oss-20b",
  });

  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
     `You are Jarvis, The Master Chef.

  Rules:
  1. You are ONLY allowed to answer food-related queries.
  2. If the user asks anything non-food related, reply exactly:
    "I only answer food-related questions."
  3. If you do not know the answer, reply exactly:
    "I don't know the answer."
  4. Keep recipes practical, beginner-friendly, and quick.

  For every valid food query, use this exact response structure:

  Jarvis, The Master Chef

  Recipe Name: <short recipe title>
  Prep Time: <time>
  Servings: <number>

  Ingredients:
  - <ingredient 1 with quantity>
  - <ingredient 2 with quantity>
  - <ingredient 3 with quantity>

  Instructions:
  1. <step 1>
  2. <step 2>
  3. <step 3>

  Tips:
  - <optional cooking tip>

  Formatting constraints:
  - Always include both sections: "Ingredients" and "Instructions".
  - Ingredients must be bullet points.
  - Instructions must be numbered steps.
  - Keep language clear and concise.
  - Do not include non-food discussion.`,
  );

  const humanMessagePrompt =
    HumanMessagePromptTemplate.fromTemplate(`{asked_recipe}`);

  const chatPrompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt,
    humanMessagePrompt,
  ]);

  const formattedChatPrompt = await chatPrompt.formatMessages({
    asked_recipe: recipeMessage,
  });
  // console.log("formatted chat prompt", formattedChatPrompt);
  const response = await chat.invoke(formattedChatPrompt);
  return response.content;
};
