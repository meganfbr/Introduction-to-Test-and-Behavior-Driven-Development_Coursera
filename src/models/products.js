const products = [];

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
  return products.filter(p => p.name === name);
}

function findByCategory(category) {
  return products.filter(p => p.category === category);
}

function findByAvailability(avail) {
  return products.filter(p => p.available === avail);
}

module.exports = {
  create, read, update, remove,
  list, findByName, findByCategory, findByAvailability
};