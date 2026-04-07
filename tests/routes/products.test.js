const request = require("supertest");
const app = require("../../src/app");

test("GET /products - List All Univ Stationery", async () => {
  // Pre-populate data
  await request(app).post("/products").send({id: "test1", name: "Test1", category: "Test", available: true});
  await request(app).post("/products").send({id: "test2", name: "Test2", category: "Test", available: false});
  const res = await request(app).get("/products");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test("GET by name - Search Univ Stationery by Name", async () => {
  // First create the product
  await request(app).post("/products").send({id: "999", name: "Blue Pen", category: "Writing", available: true});
  const res = await request(app).get("/products?name=Blue Pen");
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].name).toBe("Blue Pen");
});

test("GET by category - Search Univ Stationery by Category", async () => {
  // First create
  await request(app).post("/products").send({id: "998", name: "Test Pen", category: "Writing", available: true});
  const res = await request(app).get("/products?category=Writing");
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].category).toBe("Writing");
});

test("GET by availability - Search Univ Stationery by Availability", async () => {
  // First create unavailable
  await request(app).post("/products").send({id: "997", name: "Test Unavailable", category: "Test", available: false});
  const res = await request(app).get("/products?available=false");
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].available).toBe(false);
});

test("POST, GET, PUT, DELETE a Univ Stationery product", async () => {
  // Create
  const newProduct = { id: "201", name: "College Ruled Notebook", category: "Paper", available: true };
  let res = await request(app).post("/products").send(newProduct);
  expect(res.statusCode).toBe(201);

  // Read
  res = await request(app).get("/products/201");
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("College Ruled Notebook");

  // Update
  res = await request(app).put("/products/201").send({ name: "A5 Notebook" });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("A5 Notebook");

  // Delete
  res = await request(app).delete("/products/201");
  expect(res.statusCode).toBe(204);

  // Verify Delete
  res = await request(app).get("/products/201");
  expect(res.statusCode).toBe(404);
});