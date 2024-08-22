document.addEventListener("DOMContentLoaded", () => {
  const createNewButton = document.getElementById("create-new-btn");

  if (createNewButton) {
    createNewButton.addEventListener("click", (event) => {
      event.preventDefault(); 
      window.location.href = "/editor"; 
    });
  }
});
