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

//Wait for DOM to be fully loaded and fetch best sellers lists
document.addEventListener('DOMContentLoaded', async () => {
  try {
    
    const response = await fetch('/api/books/books');
    if (!response.ok) {
      throw new Error('Failed to fetch best sellers');
    }

    const bestSellers = await response.json();
    const bestSellersContainer = document.getElementById('best-sellers');

    
    bestSellersContainer.innerHTML = '';

    
    bestSellers.forEach(list => {
      const listTitle = document.createElement('h3');
      listTitle.textContent = list.list_name;
      bestSellersContainer.appendChild(listTitle);

      const bookList = document.createElement('ul');
      list.books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(listItem);
      });

      bestSellersContainer.appendChild(bookList);
    });
  } catch (error) {
    console.error('Error displaying best sellers:', error);
  }
});