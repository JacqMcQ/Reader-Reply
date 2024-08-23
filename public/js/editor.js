document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  const workId = document.getElementById("work-id").value;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const existingWork = document.getElementById("existing-works").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title && content) {
      const method = workId ? "PUT" : "POST";
      const url = workId ? `/api/writtenWorks/${workId}` : "/api/writtenWorks";

      const response = await fetch(url, {
        method,
        body: JSON.stringify({ title, existingWork, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        alert("Failed to post your work.");
      }
    }
  });

  // Load existing work data if editing
  if (workId) {
    fetch(`/api/writtenWorks/${workId}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("title").value = data.title;
        document.getElementById("content").value = data.content;
        // Set existing work if necessary
        document.getElementById("existing-works").value =
          data.existingWorkId || "";
      });
  }
});
