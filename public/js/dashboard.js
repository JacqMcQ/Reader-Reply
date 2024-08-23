document.addEventListener("DOMContentLoaded", () => {
  const createNewButton = document.getElementById("create-new-btn");

  if (createNewButton) {
    createNewButton.addEventListener("click", (event) => {
      event.preventDefault(); 
      window.location.href = "/editor"; 
    });
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/quotes/quote");
    if (response.ok) {
      const quoteData = await response.json();
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