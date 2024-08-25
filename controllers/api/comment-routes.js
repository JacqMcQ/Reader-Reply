const router = require("express").Router();
const { Comment, User } = require("../../models"); // Import User model

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
