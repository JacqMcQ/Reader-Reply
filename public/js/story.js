// public/js/story.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const content = document.getElementById("comment-content").value.trim();
    const workId = new URLSearchParams(window.location.search).get("id");

    if (content) {
      try {
        const response = await fetch(`/api/comments`, {
          method: "POST",
          body: JSON.stringify({ content, workId }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          window.location.reload(); // Reload the page to display the new comment
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
