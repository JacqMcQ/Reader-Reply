document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  const workId = document.getElementById("work-id").value;
   const worksList = document.getElementById("works-list");
   const existingWorksDropdown = document.getElementById("existing-works");

  // Function to load existing work data if editing
const loadWorks = async () => {
  try {
    const response = await fetch("/api/writtenWorks");
    const works = await response.json();

    // Populate the works list and dropdown
    worksList.innerHTML = works
      .map(
        (work) => `
        <li>
          <a href="/editor?id=${work.id}">${work.title}</a>
        </li>
      `
      )
      .join("");

    existingWorksDropdown.innerHTML = `
        <option value="">Select an existing work (Optional)</option>
        ${works
          .map(
            (work) => `
          <option value="${work.id}">${work.title}</option>
        `
          )
          .join("")}
      `;
  } catch (error) {
    console.error("Error loading works:", error);
  }
};

  loadWorks();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    const method = workId ? "PUT" : "POST";
    const url = workId ? `/api/writtenWorks/${workId}` : "/api/writtenWorks";

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        alert("Failed to save your work.");
      }
    } catch (error) {
      console.error('Error saving work:', error);
      alert("Failed to save your work.");
    }
  });

  document.getElementById("save-button")?.addEventListener("click", async () => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    try {
      const response = await fetch(`/api/writtenWorks/${workId}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        alert("Failed to update your work.");
      }
    } catch (error) {
      console.error('Error updating work:', error);
      alert("Failed to update your work.");
    }
  });

  document.getElementById("delete-button")?.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this work?")) {
      try {
        const response = await fetch(`/api/writtenWorks/${workId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          window.location.href = "/dashboard";
        } else {
          alert("Failed to delete your work.");
        }
      } catch (error) {
        console.error('Error deleting work:', error);
        alert("Failed to delete your work.");
      }
    }
  });
});
