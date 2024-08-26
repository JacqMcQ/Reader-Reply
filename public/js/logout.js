document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector("#logout-link");

  // Check if the logout link exists
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();

      // Send a GET request to the logout endpoint
      fetch("/api/users/logout", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/login";
          } else {
            alert("Failed to log out.");
          }
        })
        .catch((error) => {
          console.error("Error during logout:", error);
          alert("An error occurred while logging out. Please try again.");
        });
    });
  }
});
