document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("changePasswordModal");
  var btn = document.getElementById("changePasswordBtn");
  var span = document.getElementsByClassName("close")[0];
  var changePasswordMessage = document.getElementById("changePasswordMessage");

  btn.onclick = function () {
    console.log("Opening modal");
    modal.style.display = "block";
  };

  span.onclick = function () {
    console.log("Closing modal via close button");
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      console.log("Closing modal by clicking outside");
      modal.style.display = "none";
    }
  };

  document.getElementById("changePasswordForm").onsubmit = function (event) {
    event.preventDefault();
    console.log("Form submitted");

    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    // The fetch function goes here
    fetch("/api/users/change-password", {
      method: "PUT", // Make sure this matches the method defined in your backend route
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
          modal.style.display = "none"; // Close the modal
          changePasswordMessage.textContent = "Change Saved"; // Display success message
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
