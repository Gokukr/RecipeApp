const express = require("express");
const app = express();
const cors = require("cors");

const port = 1200;

app.use(express.json());
app.use(cors());
app.use("/Api",require('./Routes/Api'))

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
