const { Given } = require("@cucumber/cucumber");
const request = require("supertest");
const app = require("../../src/app");
const { fakeProduct } = require("../../tests/factories");

Given("the following stationery products:", async function (dataTable) {
  // Clear the state or DB if needed, and populate from datatable
  // Because it's an in-memory db, we can create using requests
  this.products = [];
  const model = require("../../src/models/products");
  model.list().length = 0;

  for (const row of dataTable.hashes()) {
    const productData = {
      id: row.id || require("faker").datatype.uuid(),
      name: row.name,
      category: row.category,
      available: row.available === "true"
    };

    const res = await request(app).post("/products").send(productData);
    if (res.statusCode === 201) {
      this.products.push(res.body);
    } else {
      throw new Error(`Failed to load product: ${row.name}`);
    }
  }
});