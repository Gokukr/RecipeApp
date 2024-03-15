const router = require("express").Router();
const db = require("../dbconfig");
 
router.get('/notification',async(req,res)=>
{
    try{
        const requires = await db.query("select * from user_data where role='admin'") 
        res.json(requires.rows[0].id);
    }
    catch(err)
    {
        console.log(err.message);
    }
})

router.get('/notification1', async (req, res) => {
    try {
      const { user_id } = req.query;
      console.log('User ID:', user_id);
      const result = await db.query(`
      SELECT n.*, u.first_name 
      FROM notifications AS n
      JOIN user_data AS u ON n.user_id = u.id
      WHERE n.user_id = $1
  `, [user_id]);
     res.json(result.rows);
    } catch (err) {
      console.error('Error fetching notification data:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.get("/notification", async (req, res) => {
  try {
    const requires = await db.query(
      "select * from user_data where role='admin'"
    );
    res.json(requires.rows[0].id);
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/notification1", async (req, res) => {
  try {
    const { user_id } = req.query;
    console.log("User ID:", user_id);
    const result = await db.query(
      `
      SELECT n.*, u.first_name 
      FROM notifications AS n
      JOIN user_data AS u ON n.user_id = u.id
      WHERE n.user_id = $1
  `,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notification data:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

<<<<<<< HEAD
router.post("/notification", async (req, res) => {
  try {
    const { user_id, reason } = req.body;
    await db.query(
      "INSERT INTO notifications(user_id, reason) VALUES ($1, $2)",
      [user_id, reason]
    );
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
=======
router.post('/notifications', async (req, res) => {
    try {
        const { user_id, recipe_id, reason} = req.body;
    
        await db.query("INSERT INTO notifications(user_id, recipe_id, reason) VALUES ($1, $2, $3)", [user_id, recipe_id, reason]);
>>>>>>> 26e1e5ff7ea65b7210c3aa76b28155ad499a856e

router.post("/notifications", async (req, res) => {
  try {
    const { user_id, recipe_id, reason } = req.body;

    await db.query(
      "INSERT INTO notifications(user_id, recipe_id, reason) VALUES ($1, $2, $3, $4)",
      [user_id, recipe_id, reason]
    );

    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/Getusername", async (req, res) => {
//     try {
//         const { user_id } = req.body;
//         const result = await db.query("SELECT first_name FROM user_data WHERE id = $1", [user_id]);
//         if (result.rows.length > 0) {
//             const first_name = result.rows[0].first_name;
//             res.json({ first_name });
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }
//     } catch (error) {
//         console.error('Error getting first_name:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = router;
