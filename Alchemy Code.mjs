import fetch from 'node-fetch';
import fs from 'fs';
import { cipher } from './Deciper.mjs';
import { numberToChar } from './Deciper.mjs';
import { alchemicalSymbols, symbolMap } from './Storage.mjs';
import { encryptedGrid } from './encryptedgrid.mjs';

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
        } else if (challenge.includes("Bibliotheca")) {
            await challenge3();
        } else if (challenge.includes("Hidden experiments")) {
            await challenge4();
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

async function challenge3() {
    // Decipher numbers
    const words = cipher.split(/\s+/).map(n => {
        if (n === ',' || n === ';') return n;
        const num = parseInt(n, 10);
        return isNaN(num) ? n : (numberToChar[num] ?? '?');
    })

    let sentence = words.join('');
    sentence = sentence
    .replace(/([a-z])([,.])/g, '$1$2')
    .replace(/([,.])/g, '$1 ')
    .replace(/\s+/g, ` `)
    .trim();

    console.log(sentence)

    const aliases = {
        heat: "fire",
    }

    const symbolMap = Object.fromEntries(
        alchemicalSymbols.map(entry => [entry.name.toLowerCase(), entry.symbol])
    );

    const symbols = sentence
    .toLowerCase()
    .replace(/[.,;]/g, '')        // remove punctuation
    .split(/\s+/)                 // split into words
    .map(word => {
      const resolved = aliases[word] || word;
      return symbolMap[resolved] || null;
    })
    .filter(Boolean)             // remove nulls
    .join('');

    console.log("Output of symbols: ", symbols);

    const result = await submitAnswer(symbols);
    console.log("Response from Alchemy API:", result);
}


async function challenge4() {
      
    const encodedBlock = [
        'GOLD COPPER GOLD GOLD SILVER',
        'EARTH MERCURY COPPER FIRE AIR',
        'FIRE EARTH LEAD EARTH SILVER',
        'IRON GOLD SILVER WATER GOLD',
        'COPPER FIRE GOLD IRON LEAD',
        'EARTH COPPER COPPER TIN MERCURY'
    ];

    console.log(encodedBlock);

    const pattern = encodedBlock
    .flatMap(line =>
        line.split(' ').map(word => symbolMap[word.toLowerCase()])
    )
    .join('');

    console.log(pattern)

    const patternArr = [...pattern];
    const patternLength = patternArr.length;
    
    let grid = encryptedGrid.trim().split('\n').map(line => [...line]);

    const maxCols = Math.max(...grid.map(row => row.length));
    grid = grid.map(row => [...row, ...Array(maxCols - row.length).fill('')]);

    function scanHorizontal(grid) {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col <= maxCols - patternLength; col++) {
                const slice = grid[row].slice(col, col + patternLength).join('');
                if (slice === pattern) {
                    return { row: row + 1, col: col + 1}
                }
            }
        }
        return null;
    }
    
    function scanVertical(grid) {
        for (let col = 0; col < maxCols; col++) {
          for (let row = 0; row <= grid.length - patternLength; row++) {
            const slice = Array.from({ length: patternLength }, (_, i) => grid[row + i][col]).join('');
            if (slice === pattern) {
              return { row: row + 1, col: col + 1 }; // 1-based
            }
          }
        }
        return null;
      }

    const hMatch = scanHorizontal(grid);
    const vMatch = scanVertical(grid);

    console.log(hMatch, vMatch)

    if (hMatch && vMatch) {
        
        const hIndex = (hMatch.row - 1) * maxCols + (hMatch.col - 1)
        const vIndex = (vMatch.row - 1) * maxCols + (vMatch.col - 1)

        const atomicNumber = hIndex + vIndex + 2;
        const result = [];
        console.log(atomicNumber)
        const match = alchemicalSymbols.find(e => e.atomicNumber === atomicNumber);
        console.log(match)
        if (match) {
            result.push(match.name);
        }

        await submitAnswer(result);
        console.log("Response from Alchemy API:", result)
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
            body: JSON.stringify({ player: PLAYER_EMAIL, answer: answer})
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
