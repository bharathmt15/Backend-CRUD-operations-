const mongoconnection = require("./db");
const express = require("express");
mongoconnection();
const app = express();
const port = 4000;

app.use(express.json());

// creating my own routes
app.use("/api/test", require("./Routes/test"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
