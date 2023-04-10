import { config } from "dotenv"
config()
import { Configuration, OpenAIApi } from "openai";
import readline from "readline"
// Create a new OpenAIAPI object with the API key stored in pcorcess.env...
const openAi = new OpenAIApi(
   new Configuration({
      apiKey: process.env.API_KEY
   })
)
// create a new readline interface for reading user input from command line
const userInterface = readline.createInterface({
   input: process.stdin,
   output: process.stdout
})
// Display a prompt to the user
userInterface.prompt();
// set up event listerner for when the user inputs a line of text
userInterface.on("line", async input => {
   // Use the OpenAIAPI object to create a chat completetion based on user's input 
   const res = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
   })
   // Display the reasponse from openAI chatbot
   console.log(res.data.choices[0].message.content);
   // Display another prompt to the user.
   userInterface.prompt()
})