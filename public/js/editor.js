document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editor-form");
  const workId = document.getElementById("work-id")?.value;
  const existingWorksDropdown = document.getElementById("existing-works");
  const collectionTitleInput = document.getElementById("collection-title");

  // Function to load existing works and populate dropdown
  const loadWorks = async () => {
    try {
      const response = await fetch("/api/writtenWorks");
      const works = await response.json();

      if (existingWorksDropdown) {
        // Populate the dropdown with options, including an option for a new collection
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

        // Event listener for when the dropdown selection changes
        existingWorksDropdown.addEventListener("change", function () {
          const selectedOption =
            existingWorksDropdown.options[existingWorksDropdown.selectedIndex];
          const collectionTitle = selectedOption.getAttribute(
            "data-collection-title"
          );

          // Update the collection title input based on the selected option
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
  const saveOrUpdateWork = async (event) => {
    event.preventDefault();

    // Get the values from the form fields
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
      collectionTitle,
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

  // Attach the saveOrUpdateWork function to the form's submit event
  form.addEventListener("submit", saveOrUpdateWork);

  // Attach the saveOrUpdateWork function to the "Save" and "Post" buttons
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
    // Attach event listener to the delete button for deleting the work
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
            window.location.href = "/dashboard";
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

    // Populate the comments list with the fetched comments or a "No comments yet" message
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
