const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      workId: req.body.workId,
      userId: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment." });
  }
});

// GET route to retrieve comments for a specific work
router.get("/:workId", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { workId: req.params.workId },
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve comments." });
  }
});

module.exports = router;
