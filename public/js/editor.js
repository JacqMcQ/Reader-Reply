document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  const workId = document.getElementById("work-id")?.value;
  const existingWorksDropdown = document.getElementById("existing-works");
  const collectionTitleLabel = document.getElementById(
    "collection-title-label"
  );
  const collectionTitleInput = document.getElementById("collection-title");

  // Function to load existing works and populate dropdown
  const loadWorks = async () => {
    try {
      const response = await fetch("/api/writtenWorks");
      const works = await response.json();

      if (existingWorksDropdown) {
        existingWorksDropdown.innerHTML = `
          <option value="">Select an existing work (Optional)</option>
          <option value="new">New Collection</option>
          ${works
            .map(
              (work) => `
              <option value="${work.id}">${work.title}</option>
            `
            )
            .join("")}
        `;
      }
    } catch (error) {
      console.error("Error loading works:", error);
    }
  };

  loadWorks();

  // Logic to show/hide Collection Title field based on dropdown selection
  existingWorksDropdown.addEventListener("change", function () {
    if (existingWorksDropdown.value === "new") {
      collectionTitleLabel.style.display = "block";
      collectionTitleInput.style.display = "block";
      collectionTitleInput.required = true;
    } else {
      collectionTitleLabel.style.display = "none";
      collectionTitleInput.style.display = "none";
      collectionTitleInput.required = false;
    }
  });

  // Function to save or update a work
  const saveOrUpdateWork = async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const existingWork = document
      .getElementById("existing-works")
      ?.value.trim();
    const collectionTitle = collectionTitleInput?.value.trim();

    const method = workId ? "PUT" : "POST";
    const url = workId ? `/api/writtenWorks/${workId}` : "/api/writtenWorks";

    const requestBody = {
      title,
      content,
      existingWork,
    };

    if (existingWork === "new") {
      requestBody.collectionTitle = collectionTitle;
    }

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const error = await response.json();
        alert(`Failed to save your work: ${error.message}`);
      }
    } catch (error) {
      console.error("Error saving work:", error);
      alert("Failed to save your work.");
    }
  };

  form.addEventListener("submit", saveOrUpdateWork);

  document.getElementById("save-button")?.addEventListener("click", (event) => {
    event.preventDefault();
    saveOrUpdateWork(event);
  });

  document.getElementById("post-button")?.addEventListener("click", (event) => {
    event.preventDefault();
    saveOrUpdateWork(event);
  });
});
