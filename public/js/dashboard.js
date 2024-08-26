// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const createNewButton = document.getElementById("create-new-btn");

  // Check if the "Create New" button exists
  if (createNewButton) {
    createNewButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/editor";
    });
  }
});

// Wait for the DOM to be fully loaded and fetch a random quote
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch a random quote from the server
    const response = await fetch("/api/quotes/quote");
    if (response.ok) {
      const quoteData = await response.json();
      // Display the quote and author in the element with id "quote"
      document.getElementById(
        "quote"
      ).innerText = `${quoteData.q} - ${quoteData.a}`;
    } else {
      console.error("Failed to fetch quote");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
