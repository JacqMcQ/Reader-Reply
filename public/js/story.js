document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");

  // Add an event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const content = document.getElementById("comment-content").value.trim();
    const workId = new URLSearchParams(window.location.search).get("id");

    // Check if the comment content is not empty
    if (content) {
      try {
        // Send a POST request to submit the comment
        const response = await fetch(`/api/comments`, {
          method: "POST",
          body: JSON.stringify({ content, workId }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          window.location.reload();
        } else {
          alert("Failed to post comment.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to post comment.");
      }
    }
  });
});
