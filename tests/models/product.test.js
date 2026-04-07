const model = require("../../src/models/products");

test("Create & Read Univ Stationery", () => {
  const product = { id: "101", name: "Blue Pen", category: "Writing", available: true };
  model.create(product);

  const result = model.read("101");
  expect(result.name).toBe("Blue Pen");
});

test("Update Univ Stationery", () => {
  model.update("101", { name: "Red Pen" });
  expect(model.read("101").name).toBe("Red Pen");
});

test("Delete Univ Stationery", () => {
  model.remove("101");
  expect(model.read("101")).toBeUndefined();
});

test("List All Univ Stationery", () => {
  // Clear previous data
  while (model.list().length > 0) model.remove(model.list()[0].id);
  model.create({ id: "102", name: "A4 Paper Ream", category: "Paper", available: true });
  model.create({ id: "103", name: "Highlighter Set", category: "Writing", available: false });
  const allProducts = model.list();
  expect(allProducts).toHaveLength(2);
  expect(allProducts[0].name).toBe("A4 Paper Ream");
  expect(allProducts[1].name).toBe("Highlighter Set");
});

test("Find by Name Univ Stationery", () => {
  model.create({ id: "104", name: "Binder", category: "Organization", available: true });
  const result = model.findByName("Binder");
  expect(result[0].name).toBe("Binder");
});

test("Find by Category Univ Stationery", () => {
  model.create({ id: "105", name: "Scientific Calculator", category: "Electronics", available: true });
  const result = model.findByCategory("Electronics");
  expect(result[0].category).toBe("Electronics");
});

test("Find by Availability Univ Stationery", () => {
  // Clear previous data
  while (model.list().length > 0) model.remove(model.list()[0].id);
  model.create({ id: "106", name: "Premium Backpack", category: "Accessories", available: false });
  const result = model.findByAvailability(false);
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("Premium Backpack");
  expect(result[0].available).toBe(false);
});
