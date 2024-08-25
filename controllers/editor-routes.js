// Render editor page (requires auth)
router.get("/editor", withAuth, async (req, res) => {
  try {
    const { id: workId } = req.query;
    let workData = {};

    if (workId) {
      const work = await WrittenWork.findOne({
        where: { id: workId, userId: req.session.user_id },
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });

      workData = work ? work.get({ plain: true }) : {};
    }

    res.render("editor", {
      loggedIn: req.session.loggedIn,
      work: workData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve work." });
  }
});
