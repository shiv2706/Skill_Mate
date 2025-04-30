const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()


const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.API_KEY;

async function runChat(userInput, allProfiles) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        // ... other safety settings
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ text: "i am providing you the profile details of all the users currently registered"+
                        "on my networking website"},{text: JSON.stringify(allProfiles)},],
            },
            // {
            //     role: "user",
            //     parts: [{ text: "now i will provide you with an array of skills, Or keywords or User Names what you have to do is you have to "+
            //             "analyse all the profiles of people thoroughly and respond with names of those people who either have"+
            //             "skills that match the skills or Keywords matching any of their information like title, organization,name etc.,"+
            //             "that i am providing you in the input Or match the provided input with their names and return the prfoiles where the name"+
            //             "is same as the name provided in the input. If the person has even one matching skill"+
            //             "or keyword choose them. You must strictly return"+
            //             "the response in the form of an Array like this : Example: [A,B,C....] where A, B ,C.. are names"+
            //             "of people who match the provided skills make sure the response is not like this ['A','B','C']"}],
            // },
            {
                role: "user",
                parts: [{ text: "I will provide you with a list of skills, keywords, or usernames. Your task is to analyze"+
                        "a set of user profiles. For each profile, you must determine if it meets any of the following criteria based on the input list:" +
                        "Skill Match: The profile explicitly lists a skill that is present in my input list." +
                        "Keyword Match: Any information within the profile (including title, organization, name, etc.) contains a keyword from my input list." +
                        "Name Match: The name of the person in the profile exactly matches a username from my input list." +
                        "If a profile meets at least one of these criteria, you should extract and return the name of that person."+
                        "You must strictly return the response in the form of an Array like this : Example: [A,B,C....] where A, B ,C.. are names"+
                        "of people who match the provided skills make sure the response is not like this ['A','B','C']"}],
            },
        ],
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;
    return response.text();
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