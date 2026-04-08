const products = [
  { id: "1", name: "Blue Pen", category: "Writing", available: true },
  { id: "2", name: "College Notebook", category: "Paper", available: true },
  { id: "3", name: "Scientific Calculator", category: "Electronics", available: true },
  { id: "4", name: "Premium Backpack", category: "Accessories", available: false }
];

function create(product) {
  products.push(product);
  return product;
}

function read(id) {
  return products.find(p => p.id === id);
}

function update(id, data) {
  let product = read(id);
  if (product) Object.assign(product, data);
  return product;
}

function remove(id) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) products.splice(index, 1);
}

function list() {
  return products;
}

function findByName(name) {
  if (!name) return products;
  return products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
}

function findByCategory(category) {
  if (!category) return products;
  return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
}

function findByAvailability(avail) {
  return products.filter(p => p.available === avail);
}

module.exports = {
  create, read, update, remove,
  list, findByName, findByCategory, findByAvailability
};