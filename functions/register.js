// // functions/register.js
// const fetch = require('node-fetch');

// exports.handler = async function (event) {
//   if (event.httpMethod !== 'POST') {
//     return { statusCode: 405, body: 'Method Not Allowed' };
//   }

//   const data = JSON.parse(event.body);
//   const { username, password } = data;
//   const appsScriptUrl = process.env.APPS_SCRIPT_URL;

//   if (!appsScriptUrl) {
//     return { statusCode: 500, body: 'APPS_SCRIPT_URL not set' };
//   }

//   try {
//     const response = await fetch(appsScriptUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password, upiId: '' }),
//     });

//     if (!response.ok) {
//       return { statusCode: response.status, body: 'Apps Script error' };
//     }

//     const result = await response.json();
//     return { statusCode: 200, body: JSON.stringify(result) };
//   } catch (error) {
//     console.error('Netlify function error:', error);
//     return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
//   }
// };


const bcrypt = require("bcryptjs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { username, password } = JSON.parse(event.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store in Firestore (assuming Firestore is being used)
    const { db } = require("../firebaseConfig");
    await db.collection("users").doc(username).set({ password: hashedPassword });

    return { statusCode: 200, body: JSON.stringify({ message: "User registered successfully" }) };
  } catch (error) {
    console.error("Error registering user:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
