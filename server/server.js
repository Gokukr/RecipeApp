const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const api = require("./Route/api")

const port = 1200;

app.use(express.json());
app.use(cors());

app.use("/",api);

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
