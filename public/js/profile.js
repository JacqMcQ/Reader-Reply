document.addEventListener("DOMContentLoaded", function () {
  const saveBioBtn = document.getElementById("saveBioBtn");
  const bioTextarea = document.getElementById("bio");
  const bioMessage = document.getElementById("bioMessage");

  const saveUserInfoBtn = document.querySelector(".save");
  const usernameInput = document.getElementById("username");
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const userInfoMessage = document.getElementById("userInfoMessage");

  saveBioBtn.onclick = function () {
    const bio = bioTextarea.value.trim();

    if (bio.length > 500) {
      alert("Bio cannot exceed 500 characters.");
      return;
    }

    fetch("/api/users/save-bio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          bioMessage.textContent = "Bio Saved";
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  saveUserInfoBtn.onclick = function () {
    const updatedInfo = {
      username: usernameInput.value.trim(),
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
    };

    fetch("/api/users/update-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          userInfoMessage.textContent =
            "User information updated successfully!";
        } else {
          userInfoMessage.textContent = "Error: " + data.message;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        userInfoMessage.textContent =
          "An error occurred while updating information.";
      });
  };
});
