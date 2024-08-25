document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  const workId = document.getElementById("work-id")?.value;
  const existingWorksDropdown = document.getElementById("existing-works");
  const commentForm = document.getElementById("new-comment-form");
  const collectionTitleInput = document.getElementById("collection-title");

  // Function to load existing works and populate dropdown
  const loadWorks = async () => {
    try {
      const response = await fetch("/api/writtenWorks");
      const works = await response.json();

      if (existingWorksDropdown) {
        // Start by adding the constant 'new' option
        existingWorksDropdown.innerHTML = `
          <option value="new">New Collection</option>
          ${works
            .filter((work) => work.collectionTitle) // Only include works with a collection title
            .map(
              (work) => `
              <option value="${work.id}" data-collection-title="${work.collectionTitle}">
                ${work.collectionTitle}
              </option>
            `
            )
            .join("")}
        `;

        // Auto-populate the collection title if an existing work is selected
        existingWorksDropdown.addEventListener("change", function () {
          const selectedOption =
            existingWorksDropdown.options[existingWorksDropdown.selectedIndex];
          const collectionTitle = selectedOption.getAttribute(
            "data-collection-title"
          );

          if (selectedOption.value === "new") {
            collectionTitleInput.value = ""; // Clear the input for new collection
            collectionTitleInput.placeholder = "Enter new collection title";
          } else {
            collectionTitleInput.value = collectionTitle || "";
            collectionTitleInput.placeholder = ""; // Clear the placeholder
          }
        });
      }
    } catch (error) {
      console.error("Error loading works:", error);
    }
  };

  // Function to save or update a work
  const saveOrUpdateWork = async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const existingWorkId =
      existingWorksDropdown?.value === "new"
        ? null
        : existingWorksDropdown.value.trim();
    const collectionTitle = collectionTitleInput.value.trim();

    const method = workId ? "PUT" : "POST";
    const url = workId ? `/api/writtenWorks/${workId}` : "/api/writtenWorks";

    const requestBody = {
      title,
      content,
      existingWorkId,
      collectionTitle, // Include the collection title in the request
    };

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

  const deleteButton = document.getElementById("delete-button");

  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      const workId = deleteButton.getAttribute("data-work-id");

      if (confirm("Are you sure you want to delete this work?")) {
        try {
          const response = await fetch(`/api/writtenWorks/${workId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            alert("Work deleted successfully.");
            window.location.href = "/dashboard"; // Redirect to the dashboard or another page
          } else {
            const error = await response.json();
            alert(`Failed to delete work: ${error.message}`);
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to delete work.");
        }
      }
    });
  }

  // Function to handle new comment submission
  const postComment = async (event) => {
    event.preventDefault();

    const content = commentForm.querySelector(".comment-content").value;
    const workId = commentForm.getAttribute("data-work-id");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workId, content }),
      });

      if (response.ok) {
        // Refresh comments
        const commentsList = document.getElementById("comments-list");
        const commentsResponse = await fetch(`/api/comments?workId=${workId}`);
        const comments = await commentsResponse.json();
        commentsList.innerHTML = comments
          .map(
            (comment) => `
            <div class="comment">
              <p><strong>${comment.username}:</strong> ${comment.content}</p>
              <p><em>${formatDate(comment.createdAt)}</em></p>
            </div>
          `
          )
          .join("");
        commentForm.querySelector(".comment-content").value = "";
      } else {
        const error = await response.json();
        alert(`Failed to post comment: ${error.message}`);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment.");
    }
  };

  if (commentForm) {
    commentForm.addEventListener("submit", postComment);
  }
});
