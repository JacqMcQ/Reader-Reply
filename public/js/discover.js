document.querySelectorAll(".new-comment-form").forEach((form) => {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const workId = this.getAttribute("data-work-id");
    const content = this.querySelector(".comment-content").value;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workId, content }),
      });

      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to post comment.");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  });
});
