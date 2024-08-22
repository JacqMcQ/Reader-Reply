document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector("#logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Send a GET request to the logout endpoint
      fetch("/api/users/logout", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/login"; // Redirect to the login page
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
