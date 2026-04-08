const API = "http://localhost:3000/products";

async function loadProducts() {
  const name = document.getElementById("search-name")?.value || "";
  const category = document.getElementById("search-category")?.value || "";
  const available = document.getElementById("search-available")?.value || "";

  let url = API + "?";
  let params = new URLSearchParams();
  if (name) params.append("name", name);
  if (category) params.append("category", category);
  if (available !== "") params.append("available", available);
  
  if (params.toString()) {
    url += params.toString();
  } else {
    url = API;
  }

  const res = await fetch(url);
  const data = await res.json();

  const table = document.getElementById("productTable");
  table.innerHTML = "";

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.available ? '<span style="color: green; font-weight: bold;">Available</span>' : '<span style="color: red; font-weight: bold;">Out of Stock</span>'}</td>
        <td style="text-align: center;">
          <button onclick="editProduct('${p.id}', '${p.name}', '${p.category}', ${p.available})" style="background: #eab308; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Edit</button>
          <button onclick="deleteProduct('${p.id}')" style="background: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const available = document.getElementById("available").value === "true";

  if (!name || !category) {
    alert("Please fill in both name and category!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: Date.now().toString(), name, category, available })
  });
  
  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("category").value = "";

  loadProducts();
}

function openModal() {
  document.getElementById("editModal").style.display = "block";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// Close modal when clipping outside
window.onclick = function(event) {
  const modal = document.getElementById("editModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function editProduct(id, currentName, currentCategory, currentAvailable) {
  // Populate the modal fields
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-name").value = currentName;
  document.getElementById("edit-category").value = currentCategory;
  document.getElementById("edit-available").value = currentAvailable ? "true" : "false";

  // Show the modal
  openModal();
}

async function saveEdit() {
  const id = document.getElementById("edit-id").value;
  const newName = document.getElementById("edit-name").value;
  const newCategory = document.getElementById("edit-category").value;
  const newAvailable = document.getElementById("edit-available").value === "true";

  if (!newName || !newCategory) {
    alert("Name and category cannot be empty!");
    return;
  }

  await fetch(API + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, category: newCategory, available: newAvailable })
  });

  closeModal();
  loadProducts();
}

async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    await fetch(API + "/" + id, { method: "DELETE" });
    loadProducts();
  }
}

// auto load
loadProducts();

function clearSearch() {
  if (document.getElementById("search-name")) document.getElementById("search-name").value = "";
  if (document.getElementById("search-category")) document.getElementById("search-category").value = "";
  if (document.getElementById("search-available")) document.getElementById("search-available").value = "";
  loadProducts();
}