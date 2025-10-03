const userList = document.getElementById("userList");
const errorMessage = document.getElementById("errorMessage");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userList.innerHTML = "Loading users...";
  errorMessage.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    // Clear container
    userList.innerHTML = "";

    // Display users
    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userList.appendChild(card);
    });

  } catch (error) {
    userList.innerHTML = "";
    errorMessage.textContent = "⚠️ Failed to fetch user data. Please check your connection.";
    console.error("Error fetching users:", error);
  }
}

// Initial load
fetchUsers();

// Reload button
reloadBtn.addEventListener("click", fetchUsers);
