 const express = require("express");
const cors = require("cors");
const { error } = require("console");

const app = express();
app.use(cors());

// Route to handle the /api/:date or /api (empty parameter)
const isInvalidDate = (date)=>date.toUTCString()==="Invalid Date"
app.get("/api/:date", function (req, res)  {
    let date  =new Date(req.params.date);

   
  
      
    if (isInvalidDate(date)) {
        date =new Date(+req.params.date);
  }
  
    if (isInvalidDate(date)) {
      res.json({error: "Invalid date"});
      return;
  }
    res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
  app.get("/api", (req, res) => {
    res.json({
      unix: new Date().getTime(),
      utc:new Date().toUTCString()
    })
  })

    
    
    // Return the Unix timestamp and UTC string

});


// Set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
