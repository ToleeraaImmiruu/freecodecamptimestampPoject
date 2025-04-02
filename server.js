const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Route to handle the /api/:date or /api (empty parameter)
app.get("/api/:date?", (req, res) => {
    let { date } = req.params;

    // If no date is provided, use the current date
    if (!date) {
        let now = new Date();
        return res.json({ unix: now.getTime(), utc: now.toUTCString() });
    }

    // If the date is a valid Unix timestamp, parse it
    if (!isNaN(date)) {
        date = parseInt(date);
    }
    
    let validDate = new Date(date);

    // If the date is invalid, return error
    if (validDate.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Return the Unix timestamp and UTC string
    res.json({ unix: validDate.getTime(), utc: validDate.toUTCString() });
});

// Route for root
app.get("/", (req, res) => {
    res.send("Timestamp Microservice is running!");
});

// Set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
