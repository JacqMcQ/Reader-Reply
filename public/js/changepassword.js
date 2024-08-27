document.addEventListener("DOMContentLoaded", function () {
  // Get modal, button, close button, and message elements by their IDs and classes
  var modal = document.getElementById("changePasswordModal");
  var btn = document.getElementById("changePasswordBtn");
  var span = document.getElementsByClassName("close")[0];
  var changePasswordMessage = document.getElementById("changePasswordMessage");

  // Show the modal when the "Change Password" button is clicked
  btn.onclick = function () {
    console.log("Opening modal");
    modal.style.display = "block";
  };

  // Close the modal when the close button (x) is clicked
  span.onclick = function () {
    console.log("Closing modal via close button");
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      console.log("Closing modal by clicking outside");
      modal.style.display = "none";
    }
  };

  // Handle the form submission for changing the password
  document.getElementById("changePasswordForm").onsubmit = function (event) {
    event.preventDefault();
    console.log("Form submitted");

    // Get the values from the password fields
    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    // Check if the new passwords match
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    // The fetch function goes here
    fetch("/api/users/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        console.log("Received response:", response);
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("Password changed successfully");
          modal.style.display = "none";
          changePasswordMessage.textContent = "Change Saved";
        } else {
          console.log("Error in password change:", data.message);
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
});
