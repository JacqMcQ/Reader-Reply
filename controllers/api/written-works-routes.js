const router = require("express").Router();
const { WrittenWork } = require("../../models");
const withAuth = require("../../utils/auth");

// Helper function to ensure user is logged in UPDATE middleware
function requireLogin(req, res, next) {
  if (!req.session.loggedIn || !req.session.user_id) {
    return res
      .status(403)
      .json({ error: "You must be logged in to perform this action." });
  }
  next();
}

// Create new work
// Create or add to existing collection
router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content, existingWorkId, collectionTitle, isPublished } = req.body;

    // If an existingWorkId is provided, append the new work to the collection
    if (existingWorkId) {
      const parentWork = await WrittenWork.findOne({ where: { id: existingWorkId } });

      if (parentWork) {
        const newWork = await WrittenWork.create({
          title,
          content,
          collectionTitle: parentWork.collectionTitle, // inherit the collection title
          isPublished,
          userId: req.session.user_id,
          existingWorkId: parentWork.id, // link to the existing work as part of the collection
        });

        return res.status(200).json(newWork);
      } else {
        return res.status(404).json({ message: "Parent work not found." });
      }
    }

    // If no existingWorkId, create a new work and potentially a new collection
    const newWork = await WrittenWork.create({
      title,
      content,
      collectionTitle,
      isPublished,
      userId: req.session.user_id,
    });

    res.status(200).json(newWork);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update existing work
router.put("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, collectionTitle, existingWorkId, isPublished } =
      req.body;

    const updatedWork = await WrittenWork.update(
      {
        title,
        content,
        collectionTitle,
        existingWorkId,
        isPublished,
      },
      {
        where: { id },
      }
    );

    if (updatedWork[0] === 0) {
      return res.status(404).json({ message: "No work found with this id!" });
    }

    res.status(200).json(updatedWork);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a work by ID
router.get("/:id", requireLogin, async (req, res) => {
  try {
    const work = await WrittenWork.findOne({
      where: { id: req.params.id, userId: req.session.user_id },
      attributes: [
        "id",
        "title",
        "content",
        "collectionTitle",
        "existingWorkId",
      ],
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
    const works = await WrittenWork.findAll({
      attributes: ["id", "title", "collectionTitle"],
    });
    res.status(200).json(works);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve works." });
  }
});

// DELETE route to remove a work
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const workId = req.params.id;
    const deletedWork = await WrittenWork.destroy({
      where: {
        id: workId,
      },
    });

    if (deletedWork) {
      res.status(200).json({ message: "Work deleted successfully." });
    } else {
      res.status(404).json({ message: "Work not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete work." });
  }
});
module.exports = router;
