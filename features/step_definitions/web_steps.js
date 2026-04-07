const { When, Then } = require("@cucumber/cucumber");
const request = require("supertest");
const app = require("../../src/app");

When("I request all stationery products", async function () {
  this.res = await request(app).get("/products");
});

Then("I should see a list containing {int} products", function (expectedCount) {
  if (this.res.statusCode !== 200) throw new Error("Error status=" + this.res.statusCode);
  if (this.res.body.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} products, got ${this.res.body.length}`);
  }
});

When("I search stationery by name {string}", async function (name) {
  this.res = await request(app).get(`/products?name=${name}`);
});

Then("I should find exactly {int} product named {string}", function (expectedCount, name) {
  if (this.res.body.length !== expectedCount) throw new Error("Count mismatch");
  if (expectedCount > 0 && this.res.body[0].name !== name) throw new Error("Name mismatch");
});

When("I search stationery by category {string}", async function (category) {
  this.res = await request(app).get(`/products?category=${category}`);
});

Then("I should find exactly {int} product in the {string} category", function (expectedCount, category) {
  if (this.res.body.length !== expectedCount) throw new Error("Count mismatch");
  if (expectedCount > 0 && this.res.body[0].category !== category) throw new Error("Category mismatch");
});

When("I search stationery by availability {string}", async function (availStr) {
  this.res = await request(app).get(`/products?available=${availStr}`);
});

Then("I should find exactly {int} unavailable product", function (expectedCount) {
  if (this.res.body.length !== expectedCount) throw new Error("Count mismatch");
});

When("I request a stationery product named {string}", async function (name) {
  const allRes = await request(app).get(`/products?name=${name}`);
  const id = allRes.body[0].id;
  this.res = await request(app).get(`/products/${id}`);
});

Then("I should see the product details with name {string}", function (name) {
  if (this.res.body.name !== name) throw new Error("Name mismatch");
});

When("I update the available status to {string} for stationery named {string}", async function (availStr, name) {
  const allRes = await request(app).get(`/products?name=${name}`);
  const id = allRes.body[0].id;
  this.res = await request(app).put(`/products/${id}`).send({ available: availStr === "true" });
});

Then("the product named {string} should have availability {string}", async function (name, availStr) {
  const allRes = await request(app).get(`/products?name=${name}`);
  const expectedBool = availStr === "true";
  if (allRes.body[0].available !== expectedBool) throw new Error("Availability not updated");
});

When("I delete the stationery named {string}", async function (name) {
  const allRes = await request(app).get(`/products?name=${name}`);
  if (allRes.body.length > 0) {
    const id = allRes.body[0].id;
    this.res = await request(app).delete(`/products/${id}`);
  }
});

Then("I should not find {string} in the list of products", async function (name) {
  const allRes = await request(app).get(`/products?name=${name}`);
  if (allRes.body.length > 0) throw new Error("Product still exists");
});