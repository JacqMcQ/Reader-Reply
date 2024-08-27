// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  const workId = document.getElementById("work-id")?.value;
  const existingWorksDropdown = document.getElementById("existing-works");
  const collectionTitleInput = document.getElementById("collection-title");
  const saveButton = document.getElementById("save-button");
  const postButton = document.getElementById("post-button");
  const deleteButton = document.querySelector(".delete-btn");

  // Function to load existing works and populate dropdown
  const loadWorks = async () => {
    try {
      const response = await fetch("/api/writtenWorks");
      const works = await response.json();

      if (existingWorksDropdown) {
        existingWorksDropdown.innerHTML = `
          <option value="new">New Collection</option>
          ${works
            .filter((work) => work.collectionTitle)
            .map(
              (work) => `
              <option value="${work.id}" data-collection-title="${work.collectionTitle}">
                ${work.collectionTitle}
              </option>
            `
            )
            .join("")}
        `;

        existingWorksDropdown.addEventListener("change", function () {
          const selectedOption =
            existingWorksDropdown.options[existingWorksDropdown.selectedIndex];
          const collectionTitle = selectedOption.getAttribute(
            "data-collection-title"
          );

          if (selectedOption.value === "new") {
            collectionTitleInput.value = "";
            collectionTitleInput.placeholder = "Enter new collection title";
          } else {
            collectionTitleInput.value = collectionTitle || "";
            collectionTitleInput.placeholder = "";
          }
        });
      }
    } catch (error) {
      console.error("Error loading works:", error);
    }
  };

  // Function to save or update a work
  const saveOrUpdateWork = async (event, post = false) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const existingWorkId =
      existingWorksDropdown?.value === "new"
        ? null
        : existingWorksDropdown.value.trim();
    const collectionTitle = collectionTitleInput.value.trim();

    // Use POST if workId doesn't exist, otherwise use PUT to update
    const method = workId ? "PUT" : "POST";
    const url = workId ? `/api/writtenWorks/${workId}` : "/api/writtenWorks";

    // Prepare the request body
    const requestBody = {
      title,
      content,
      existingWorkId,
      collectionTitle,
      isPublished: post, // Update the isPublished flag based on the post argument
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
        // Redirect to the appropriate page based on whether the post flag is set
        if (post) {
          window.location.href = "/discover";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        const error = await response.json();
        alert(`Failed to save your work: ${error.message}`);
      }
    } catch (error) {
      console.error("Error saving work:", error);
      alert("Failed to save your work.");
    }
  };
  // Add event listeners for buttons
  if (saveButton) {
    saveButton.addEventListener("click", (event) => {
      saveOrUpdateWork(event);
    });
  }

  if (postButton) {
    postButton.addEventListener("click", (event) => {
      saveOrUpdateWork(event, true);
    });
  }

  // Delete work handler
  const deleteWorkHandler = async (event) => {
    event.preventDefault();

    const workId = document.querySelector("#work-id").value;

    try {
      // Send DELETE request
      const response = await fetch(`/api/writtenWorks/${workId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Work deleted successfully.");
        window.location.href = "/dashboard";
      } else {
        const result = await response.json();
        alert(result.message || "Failed to delete work.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Add event listener for delete button if the button exists
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteWorkHandler);
  }

  // Function to load comments for the specific work
  const loadComments = async (workId) => {
    try {
      const response = await fetch(`/api/comments?workId=${workId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const comments = await response.json();
      displayComments(comments);
    } catch (err) {
      console.error("Error loading comments:", err);
      alert("Failed to load comments.");
    }
  };

  // Function to display comments on the page
  const displayComments = (comments) => {
    const commentsList = document.getElementById("comments-list");
    if (!commentsList) {
      console.error("Comments list element not found.");
      return;
    }

    commentsList.innerHTML = comments.length
      ? comments
          .map(
            (comment) => `
          <div class="comment">
            <p>${comment.content}</p>
            <p class="username">- ${comment.user.username}</p>
            <p class="date">${formatDate(comment.createdAt)} at ${formatTime(
              comment.createdAt
            )}</p>
          </div>
        `
          )
          .join("")
      : "<p>No comments yet.</p>";
  };

  // Helper functions to format the date and time
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString();
  };

  // Load comments if workId is present
  if (workId) {
    loadComments(workId);
  }

  // Load works on page load
  loadWorks();
});
