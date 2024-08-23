const router = require("express").Router();
const { WrittenWork } = require("../../models");

// Helper function to ensure user is logged in
function requireLogin(req, res, next) {
  if (!req.session.loggedIn || !req.session.user_id) {
    return res
      .status(403)
      .json({ error: "You must be logged in to perform this action." });
  }
  next();
}

// Create new work
router.post("/", requireLogin, async (req, res) => {
  try {
    const { title, content, existingWorkId } = req.body;

    const newWork = await WrittenWork.create({
      title,
      content,
      userId: req.session.user_id,
      existingWorkId: existingWorkId || null,
    });

    res.status(200).json(newWork);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create new work." });
  }
});

// Update existing work
router.put("/:id", requireLogin, async (req, res) => {
  try {
    const { title, content, existingWork } = req.body;
    const workId = req.params.id;

    const [updated] = await WrittenWork.update(
      { title, content, existingWorkId: existingWork || null },
      { where: { id: workId, userId: req.session.user_id }, returning: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Work not found or not owned by user." });
    }

    res.status(200).json({ message: "Work updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update work." });
  }
});

// Retrieve a work by ID
router.get("/:id", requireLogin, async (req, res) => {
  try {
    const work = await WrittenWork.findOne({
      where: { id: req.params.id, userId: req.session.user_id },
    });

    if (!work) {
      return res
        .status(404)
        .json({ error: "Work not found or not owned by user." });
    }

    res.status(200).json(work);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});

// Retrieve all works
router.get("/", async (req, res) => {
  try {
    const works = await WrittenWork.findAll();
    res.status(200).json(works);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve works." });
  }
});

module.exports = router;
