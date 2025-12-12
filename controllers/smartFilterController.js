const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, SchemaType} = require('@google/generative-ai');
const dotenv = require('dotenv').config()


const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = process.env.API_KEY;

async function runChat(userInput, allProfiles) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME,
        generationConfig: {
            // 1. This forces the model to ONLY output valid JSON. No markdown, no talking.
            responseMimeType: "application/json",
            responseSchema: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
            }
        }});
    const prompt = `
    You are a smart search engine for a networking website "Skillmate".
    
    TASK:
    Analyze the provided user profiles and return a list of names that match the USER QUERY based on:
    1. Skill Match: Profile explicitly lists a skill from the query.
    2. Keyword Match: Title, organization, or bio contains a keyword.
    3. Semantic Match: Inferred match (e.g., "React" matches "Frontend Developer", "Power BI" matches "Data Visualization" etc).
    
    USER QUERY: "${userInput}"
    
    PROFILES DATA:
    ${JSON.stringify(allProfiles)}
    
    OUTPUT REQUIREMENT:
    Return strictly a JSON Array of strings containing only the names of matching profiles.
    Example: ["Shivansh Barthwal", "Aiman Choudhri"]
  `;

    // const generationConfig = {
    //     temperature: 0.9,
    //     topK: 1,
    //     topP: 1,
    //     maxOutputTokens: 1000,
    // };

    // const safetySettings = [
    //     {
    //         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    //         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //     },
    //     // ... other safety settings
    // ];

    // const chat = model.startChat({
    //     generationConfig,
    //     safetySettings,
    //     history: [
    //         {
    //             role: "user",
    //             parts: [{ text: "i am providing you the profile details of all the users currently registered"+
    //                     "on my networking website"},{text: JSON.stringify(allProfiles)},],
    //         },
    //         // {
    //         //     role: "user",
    //         //     parts: [{ text: "now i will provide you with an array of skills, Or keywords or User Names what you have to do is you have to "+
    //         //             "analyse all the profiles of people thoroughly and respond with names of those people who either have"+
    //         //             "skills that match the skills or Keywords matching any of their information like title, organization,name etc.,"+
    //         //             "that i am providing you in the input Or match the provided input with their names and return the prfoiles where the name"+
    //         //             "is same as the name provided in the input. If the person has even one matching skill"+
    //         //             "or keyword choose them. You must strictly return"+
    //         //             "the response in the form of an Array like this : Example: [A,B,C....] where A, B ,C.. are names"+
    //         //             "of people who match the provided skills make sure the response is not like this ['A','B','C']"}],
    //         // },
    //         {
    //             role: "user",
    //             parts: [{ text: "I will provide you with a list of skills, keywords, or usernames. Your task is to analyze"+
    //                     "a set of user profiles. For each profile, you must determine if it meets any of the following criteria based on the input list:" +
    //                     "Skill Match: The profile explicitly lists a skill that is present in my input list." +
    //                     "Keyword Match: Any information within the profile (including title, organization, name, etc.) contains a keyword from my input list." +
    //                     "Name Match: The name of the person in the profile exactly matches a username from my input list." +
    //                     "or if you think on analysing that a certain profile might be fit or related to the entered keyword like a person with react as a skill is fit for frontend "+
    //                     "developer keyword then return that also."+
    //                     "If a profile meets at least one of these criteria, you should extract and return the name of that person."+
    //                     "You must strictly return the response in the form of an Array like this : Example: [A,B,C....] where A, B ,C.. are names"+
    //                     "of people who match the provided skills make sure the response is not like this ['A','B','C']"}],
    //         },
    //     ],
    // });

    // const result = await chat.sendMessage(userInput);
    // const response = result.response;
    // return response.text();
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;

        // 3. Clean and parse the response safely
        const text = response.text();
        console.log("Raw Model Response:", text); // For debugging

        return text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "[]"; // Return empty array on failure so frontend doesn't crash
    }
}


const FilterProfiles = async (req, res) => {
    try{
        const {userInput, allProfiles} = req.body;
        console.log(allProfiles);


        // let context = JSON.stringify(userInfo);

        // console.log(context)
        const response = await runChat(userInput, allProfiles);
        console.log("runchat invoked")

        console.log(response)

        return res.status(200).send(response);




    }catch(err){
        console.error(err);
    }
}

module.exports = {FilterProfiles};