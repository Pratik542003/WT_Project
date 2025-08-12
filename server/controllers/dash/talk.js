// require("dotenv").config(); // Load .env if using environment variables

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const keyy = 'AIzaSyAlMk2jGRH7kVT2112Tdft5s65PmYkhwYY'

// const genAI = new GoogleGenerativeAI(keyy);

// const talk = async (req, res) => {
//   try {
//     const { input } = req.body;

//     const modifiedPrompt = input + process.env.STRING;

//     const generationConfig = {
//       temperature: 0.4,
//       topP: 0.3,
//       topK: 16,
//     };

//     const model = genAI.getGenerativeModel({
//       model: "gemini-pro",
//       generationConfig,
//     });

//     const result = await model.generateContent(modifiedPrompt);
//     const response = await result.response;
//     const text = await response.text(); // `text()` is a Promise, so await is needed

//     res.send({ message: text });

//   } catch (err) {
//     console.error("Error generating response:", err);
//     res.status(500).send({ error: "Something went wrong" });
//   }
// };

// module.exports = talk;
// server/controllers/dash/talk.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Get your API key from environment variables
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("Google API key not found in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const talk = async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User Message:", userMessage);

    if (!userMessage) {
      return res.status(400).json({ error: "Message field is required" });
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ message: text });
  } catch (error) {
    console.error("Error generating response:", error.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
};

module.exports = { talk };
