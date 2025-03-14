const bcrypt = require("bcryptjs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // Get user from Firestore
    const { db } = require("../firebaseConfig");
    const userDoc = await db.collection("users").doc(username).get();

    if (!userDoc.exists) {
      return { statusCode: 401, body: JSON.stringify({ error: "Invalid username or password" }) };
    }

    const user = userDoc.data();
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return { statusCode: 401, body: JSON.stringify({ error: "Invalid username or password" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Login successful", coins: 500 }) };
  } catch (error) {
    console.error("Error logging in:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
