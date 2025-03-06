let { app, getProducts, getProductsById, addProducts } = require("../index");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getProducts: jest.fn(),
  getProductsById: jest.fn(),
  addProducts: jest.fn(),
}));
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getProducts should return all products", () => {
    const mockProducts = [
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
    ];

    getProducts.mockReturnValue(mockProducts);

    let result = getProducts();
    expect(result).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalled();
  });

  test("getProductsById should return products details", () => {
    const mockProducts = {
      id: 1,
      name: "Laptop",
      category: "Electronics",
    };
    getProductsById.mockReturnValue(mockProducts);

    let result = getProductsById(1);
    expect(result).toEqual(mockProducts);
    expect(getProductsById).toHaveBeenCalledWith(1);
  });

  test("getProductById should return undefined id product is not found", () => {
    getProductsById.mockReturnValue(undefined);

    let result = getProductsById(99);
    expect(result).toBeUndefined();
    expect(getProductsById).toHaveBeenCalledWith(99);
  });

  test("addPproducts should add new product", () => {
    const newProduct = {
      id: 5,
      name: "Tablet",
      category: "Electronics",
    };
    addProducts.mockReturnValue(newProduct);

    let result = addProducts(newProduct);
    expect(result).toEqual(newProduct);
    expect(addProducts).toHaveBeenCalledWith(newProduct);
  });
});
