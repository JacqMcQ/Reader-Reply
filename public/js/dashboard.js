document.addEventListener("DOMContentLoaded", () => {
  const actionButton = document.querySelector(".action-btn");

  // Handle the action button (e.g., create new item)
  if (actionButton) {
    actionButton.addEventListener("click", (event) => {
      event.preventDefault();
      // No action is performed when the button is clicked
    });
  }
});
