const faker = require("faker");

class ProductFactory {
  static createFakeProduct() {
    const categories = ["Writing", "Paper", "Organization", "Art", "Accessories", "Electronics"];
    const names = [
      "Blue Pen", "College Ruled Notebook", "Binder", "Highlighter Set", 
      "Scientific Calculator", "Precision Eraser", "Sticky Notes", 
      "A4 Paper Ream", "Clear Pencil Case"
    ];
    
    return {
      id: faker.datatype.uuid(),
      name: faker.random.arrayElement(names),
      category: faker.random.arrayElement(categories),
      available: faker.datatype.boolean()
    };
  }
}

// Keep fakeProduct directly exported for backward compatibility
module.exports = { 
  ProductFactory, 
  fakeProduct: ProductFactory.createFakeProduct 
};