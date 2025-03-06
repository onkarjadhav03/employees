let { getProducts, getProductById, addNewProduct } = require("../products");

describe("Product Function", () => {
  it("should return all the products", () => {
    let products = getProducts();
    expect(products.length).toBe(4);
  });

  it("should return a product by id", () => {
    let product = getProductById(1);
    expect(product).toEqual({
      id: 1,
      name: "Laptop",
      category: "Electronics",
    });
  });

  it("should return undefined for a non-existant product", () => {
    let product = getProductById(99);
    expect(product).toBeUndefined();
  });

  it("should add a new product", () => {
    let newProduct = {
      name: "Tablet",
      category: "Electronics",
    };
    let addedProduct = addNewProduct(newProduct);
    expect(addedProduct).toEqual({
      id: 5,
      name: "Tablet",
      category: "Electronics",
    });
  });
});
