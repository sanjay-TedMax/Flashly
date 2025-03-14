

// import express from "express";
// import cors from "cors";

// const app = express();
// const PORT = 5001; // Ensure this is not 5173

// app.use(express.json()); // Middleware to parse JSON requests
// app.use(cors()); // Allow frontend requests

// // ✅ Fix the Route (No "/functions" in the route definition)
// app.post("/saveUser", async (req, res) => {
//     console.log("Received Data:", req.body);
//     res.status(200).json({ message: "User saved successfully!" });
// });

// app.listen(PORT, () => {
//     console.log(`✅ Server running at http://localhost:${PORT}`);
// });

import cors from "cors";
 // Allow frontend requests
import express from "express";
import { google } from "googleapis";
import fs from "fs";

// Load Google credentials
const credentials = JSON.parse(fs.readFileSync("./functions/google-credentials.json", "utf-8"));
const { client_email, private_key } = credentials;

const app = express();
app.use(express.json());
app.use(cors());
// Google Sheets Setup
const auth = new google.auth.JWT(client_email, null, private_key, ["https://www.googleapis.com/auth/spreadsheets"]);
const sheets = google.sheets({ version: "v4", auth });

const SHEET_ID = "1-WXf7OP-OOGthAU60F_XFr7FbGPyiKMpdTG8fqDVagM";  // Replace with actual Sheet ID
const SHEET_NAME = "Sheet1"; // Ensure this matches your sheet tab name

app.post("/saveUser", async (req, res) => {
  try {
    const { username, password } = req.body;

    const values = [[username, password, new Date().toISOString()]]; // Append with timestamp

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:C`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: { values },
    });

    console.log(`✅ Added user: ${username}`);
    res.json({ message: "User saved successfully!" });

  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ error: "Failed to save user to Google Sheets." });
  }
});

app.listen(5001, () => console.log("🚀 Server running at http://localhost:5001"));
