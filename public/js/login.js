const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get username and password values
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const captcha = document.querySelector("#captcha").value.trim();

  // Check if all required fields are filled
  if (username && password && captcha) {
    try {
      // Send POST request to log in
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password, captcha }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to log in.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  } else {
    alert("Please enter both username and password.");
  }
};

// Add event listener for login form submission if the form exists
const loginForm = document.querySelector(".login-form");

if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);
}
