const router = require("express").Router();
const { WrittenWork } = require("../../models");

// Create new work
router.post("/", async (req, res) => {
  try {
    const newWork = await WrittenWork.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user_id,
      existingWorkId: req.body.existingWork || null,
    });
    res.status(200).json(newWork);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create new work." });
  }
});

// Update existing work
router.put("/:id", async (req, res) => {
  try {
    const updatedWork = await WrittenWork.update(
      {
        title: req.body.title,
        content: req.body.content,
        existingWorkId: req.body.existingWork || null,
      },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).json(updatedWork);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update work." });
  }
});

// Retrieve work by ID for editing
router.get("/:id", async (req, res) => {
  try {
    const work = await WrittenWork.findByPk(req.params.id);
    res.status(200).json(work);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});

// Retrieve all works
router.get("/", async (req, res) => {
  try {
    const works = await WrittenWork.findAll();
    res.status(200).json(works);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve works." });
  }
});

module.exports = router;
