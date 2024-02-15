const router = require("express").Router();
const db = require("../dbconfig");
const path = require("path");

router.get("/api/data", (req, res) => {
  const data = { message: "Hello world" };
  res.json(data);
});

router.get("recipe/:id", (req, res) => {
  const { id } = req.params;
  res.redirect(`recipe/${id}`);
});

//for ingredients data
router.post("/insertdata", async (req, res) => {
  try {
    const { ingredient_name, category } = req.body;

    await db.query(
      "INSERT INTO ingredients (ingredient_name,category) VALUES($1,$2)",
      [ingredient_name, category]
    );
    res.json({ success: true, message: "insertion successfull" });
    console.log(ingredient_name, category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//for meal type table
// router.post("/mealtype", async (req, res) => {
//   try {
//     const { name, description, type } = req.body;
//     await db.query(
//       "INSERT INTO meal_type(name,description,type)VALUES($1,$2,$3)",
//       [name, description, type]
//     );
//     console.log(name);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

//for favorites table
// router.post("/favorites", async (req, res) => {
//   try {
//     const { notes } = req.body;
//     await db.query("INSERT INTO favorites(notes) VALUES($1)", [notes]);
//     console.log(notes);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

router.get("/getdata", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recipe");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
