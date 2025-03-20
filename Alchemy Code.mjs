import fetch from 'node-fetch';
import fs from 'fs';

// Email for authentication
const PLAYER_EMAIL = "hlmnguyen@uia.no";

// Base URLs for the systems
const ALCHEMY_API = "https://alchemy-kd0l.onrender.com";

/**
 * Initiates the mission by contacting the RIS or Alchemy system.
 * Determines the challenge type and executes the corresponding function.
 */
async function startMission() {
    try {
        console.log("Connecting to Alchemy system...");
        const response = await fetch(`${ALCHEMY_API}/start?player=${PLAYER_EMAIL}`);
        const data = await response.json();
        console.log("Alchemy Challenge Data Received:", data);

        const challenge = data.challenge;
        
        // Check what type of challenge we have received and solve accordingly
        if (challenge.includes("access code")) {
            await solveAlchemyStage1();
        } else if (challenge.includes("Icy Lethe")) {
            await challenge2();
        } 
        
    } catch (error) {
        console.error("Error starting mission:", error);
    }
}

/**
 * Solves Alchemy Stage 1 challenge by decoding the given symbols.
 */
async function solveAlchemyStage1() {
    try {
        console.log("Deciphering alchemical code...");
        
        // Alchemical symbols
        const alchemical_map = {
            "☉": "Gold", // Gold (Sun) 79
            "☿": "Quicksilver", // QuickSilver (Mercury) 80
            "☽": "Silver", // Silver (Moon) 47
            "♂": "Iron", // Iron (Mars) 26
        };

        // Given code “☉☿☽♂☉”
        const code = ["☉", "☿", "☽", "♂", "☉"];
        const decodedSequence = code.map(symbol => alchemical_map[symbol]).join(",");
        console.log(`Decoded sequence: ${decodedSequence}`);

        // Submit the answer
        const result = await submitAnswer(decodedSequence);
        console.log("Response from Alchemy API:", result);

        /*if (result.message.toLowerCase().includes("incorrect answer")) {
            await getClue();
        } */
    } catch (error) {
        console.error(error);
    }
}

async function challenge2() {
    try {
    const poem = "Still flows the Icy Lethe, Veiling all ’neath Eldritch Rime";

    const extractedWord = poem.match(/[A-Z]/g).join('');

    console.log("Extracted word: ", extractedWord);

    const result = await submitAnswer(extractedWord);
    console.log("Response from Alchemy API: ", result);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Submits an answer to the Alchemy system.
 * @param {string|number} answer - The computed answer to submit.
 */
async function submitAnswer(answer) {
    try {
        console.log("Submitting alchemy answer...");
        const response = await fetch(`${ALCHEMY_API}/answer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: PLAYER_EMAIL, answer: answer })
        });
        console.log(answer);
        return await response.json();
    } catch (error) {
        console.error("Error submitting alchemy answer:", error);
    }
}

async function getClue() {
    try {
        const response = await fetch(`${ALCHEMY_API}/clue?player=${PLAYER_EMAIL}`);
        const clueData = await response.json();
        console.log(clueData);
        return clueData;
    } catch (error) {
        console.error(error)
    }
}

// Run the mission
startMission().catch(console.error);