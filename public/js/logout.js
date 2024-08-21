// Get the logout button element
const logoutButton = document.querySelector("#logout");

// Check if the logout button exists before adding the event listener
if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    logout();
  });
}

// Function to handle the logout process
const logout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // Redirect to the homepage on success
    } else {
      alert("Failed to log out."); // Alert on failure
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("An error occurred while logging out. Please try again.");
  }
};
