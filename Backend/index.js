const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "500000mb", extended: true }));
const ConnectToMongo = require("./db");
ConnectToMongo();

app.use(express.json({ limit: "500000mb" }));
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));

app.listen(port, function () {
  console.log(`Backend App listening on port ${port}`);
});
