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

document.addEventListener("DOMContentLoaded", async () => {
  // Fetch and display the New York Times Best Sellers list
  try {
    const response = await fetch("/api/books/books");
    if (!response.ok) {
      throw new Error("Failed to fetch best sellers");
    }

    const bestSellers = await response.json();
    const bestSellersContainer = document.querySelector(".best-seller-list");

    bestSellersContainer.innerHTML = "";

    bestSellers.forEach((list, index) => {
      if (index < 5) {
        // Only display the first 5 lists
        const bookCard = document.createElement("div");
        bookCard.classList.add("best-seller-card");

        bookCard.innerHTML = `
          <h3>${list.list_name}</h3>
          <ul>
            ${list.books
              .map(
                (book) => `
              <li>
                <strong>${book.title}</strong>
                <p>by ${book.author}</p>
              </li>
            `
              )
              .join("")}
          </ul>
        `;

        bestSellersContainer.appendChild(bookCard);
      }
    });
  } catch (error) {
    console.error("Error displaying best sellers:", error);
  }
});
