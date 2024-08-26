// Select all elements with the class "new-comment-form" and add an event listener to each form
document.querySelectorAll(".new-comment-form").forEach((form) => {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the work ID and comment content from the form's data attributes and input fields
    const workId = this.getAttribute("data-work-id");
    const content = this.querySelector(".comment-content").value;

    try {
      // Send a POST request to the server to submit the new comment
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
