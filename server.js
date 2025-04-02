const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


app.get("/api/:date", (req, res) => {
    let { date } = req.params;


    if (!date) {
        let now = new Date();
        return res.json({ unix: now.getTime(), utc: now.toUTCString() });
    }

    if (!isNaN(date)) {
        date = parseInt(date);
    }

    let validDate = new Date(date);


    if (validDate.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }


    res.json({ unix: validDate.getTime(), utc: validDate.toUTCString() });
});


app.get("/", (req, res) => {
    res.send("Timestamp Microservice is running!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
