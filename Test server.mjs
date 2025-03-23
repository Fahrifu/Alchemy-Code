// Email for authentication
const PLAYER_EMAIL = "hlmnguyen@uia.no";

// Base URLs for the systems
const ALCHEMY_API = "https://alchemy-kd0l.onrender.com";

async function startMission() {
    try {
        console.log("Connecting to Alchemy system...");
        const response = await fetch(`${ALCHEMY_API}/start?player=${PLAYER_EMAIL}`);
        const data = response;
        console.log("Alchemy Challenge Data Received:", data);
    } catch (error) {
        console.error("Error starting mission:", error);
    }
}

startMission()