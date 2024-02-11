const express = require("express");
const app = express();
const cors = require("cors");

const port = 1200;

app.use(express.json());
app.use(cors());
app.use("/api", require("./Routes/Api"));
app.use("/api/manage", require("./Routes/ManageRecipe"));

// app.get("/api/data", (req, res) => {
//   const data = { message: "Hello world" };
//   res.json(data);
// });

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
