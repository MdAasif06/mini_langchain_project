import { ChatGroq } from "@langchain/groq";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

export const askJarvis =async (recipeMessage) => {
  // console.log(recipeMessage)
  const SECRET_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const chat = new ChatGroq({
    apiKey: SECRET_KEY,
  });
  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
    `Your name is Jarvis.You are a master chef so First Introduce yourself as 
    Jarvis,The Master chef.You can write any type of food recipe which can be 
    cooked in 5 minutes. You are only allowed to answer food related quries. 
    If you don't know the answer then tell I don't know the answer`,
  );

  const humanMessagePrompt =
    HumanMessagePromptTemplate.fromTemplate(`{asked_recipe}`);

  const chatPrompt =  ChatPromptTemplate.fromMessages([
    systemMessagePrompt,
    humanMessagePrompt,
  ]);
  const formattedChatPrompt = await chatPrompt.formatMessages({
    asked_recipe: recipeMessage,
  });
  console.log("formatted chat prompt", formattedChatPrompt);
  return "this is recepie"
};
