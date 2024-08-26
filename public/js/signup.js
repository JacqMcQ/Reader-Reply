const signupFormHandler = async (event) => {
  event.preventDefault(); 

  // Get email, username, and password values
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const captcha = document.querySelector("#captcha").value.trim();

  if (email && username && password && captcha) {
    try {
      // Send POST request to sign up
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, username, password, captcha }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Redirect to dashboard on success
        document.location.replace("/dashboard");
      } else {
        alert("Failed to sign up.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  } else {
    alert("Please fill out all fields.");
  }
};

// Add event listener for signup form submission
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
