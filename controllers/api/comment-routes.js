const router = require("express").Router();
const { Comment, User } = require("../../models"); // Import User model
const withAuth = require("../../utils/auth");

// Route to create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    // Extract the content and workId from the request body
    const { content, workId } = req.body;

    // Ensure the required fields are present
    if (!content || !workId) {
      return res.status(400).json({ error: "Content and workId are required" });
    }

    // Create a new comment in the database
    const newComment = await Comment.create({
      content,
      workId,
      userId: req.session.user_id, // Assuming you store the user's ID in the session
    });

    // Respond with the newly created comment
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// Retrieve comments for a specific work
router.get("/", async (req, res) => {
  try {
    const { workId } = req.query;

    if (!workId) {
      return res.status(400).json({ error: "workId is required" });
    }

    const comments = await Comment.findAll({
      where: { workId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve comments." });
  }
});

module.exports = router;
