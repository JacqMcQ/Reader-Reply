document.addEventListener("DOMContentLoaded", function () {
  const saveBioBtn = document.getElementById("saveBioBtn");
  const bioTextarea = document.getElementById("bio");
  const bioMessage = document.getElementById("bioMessage");

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
});
