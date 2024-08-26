const router = require("express").Router();
const { WrittenWork } = require("../../models");

router.get("/editor", async (req, res) => {
  const workId = req.query.id;

  if (workId) {
    try {
      const work = await WrittenWork.findByPk(workId);
      if (work) {
        res.render("editor", {
          workId: work.id,
          title: work.title,
          content: work.content,
          existingWorkId: work.existingWorkId,
        });
      } else {
        res.status(404).send("Work not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to retrieve work.");
    }
  } else {
    res.render("editor");
  }
});

module.exports = router;
