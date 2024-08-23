const router = require("express").Router();
const { WrittenWork } = require("../../models");

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

router.get("/:id", async (req, res) => {
  try {
    const work = await WrittenWork.findByPk(req.params.id);
    res.status(200).json(work);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});

module.exports = router;
