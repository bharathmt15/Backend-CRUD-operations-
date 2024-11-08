const mongoconnection = require("./db");
const express = require("express");
mongoconnection();
const app = express();
const port = 4000;
var cors = require("cors");

app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

// creating my own routes
app.use("/api/test", require("./Routes/test"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
