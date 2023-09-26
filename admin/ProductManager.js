const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.nextProductId = 1;
    this.products = [];
    this.loadProductsFromFile();
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextProductId = this.getNextProductId();
    } catch (error) {
      this.products = [];
    }
  }

  async saveProductsToFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving products to file:', error);
    }
  }

  addProduct(productData) {
    try {
      const existingProduct = this.products.find((product) => product.code === productData.code);

      if (existingProduct) {
        throw new Error('Product code is already in use.');
      }

      const product = {
        id: this.nextProductId++,
        ...productData,
      };
      this.products.push(product);
      this.saveProductsToFile();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id, updatedProductData) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
      this.saveProductsToFile();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    if (this.products.length < initialLength) {
      this.saveProductsToFile();
      return true;
    }
    return false;
  }

  getNextProductId() {
    if (this.products.length === 0) {
      return 1;
    }
    return Math.max(...this.products.map((product) => product.id)) + 1;
  }
}

module.exports = ProductManager;


const productManager = new ProductManager('products.json');

(async () => {
  try {
    await productManager.addProduct({
      title: 'pan con queso',
      description: 'pancon jamon y queso',
      price: 20.88,
      thumbnail: 'pan.jpg',
      code: 'P001',
      stock: 50,
    });
    productManager.addProduct({
        title: 'arepa',
        description: 'areina con agua',
        price: 2,
        thumbnail: 'arepa.jpg',
        code: 'P002',
        stock: 30,
      });
      
      productManager.addProduct({
        title: 'wasakaka',
        description: 'ojas verdes con limon',
        price: 4,
        thumbnail: 'wasakaka.jpg',
        code: 'P003',
        stock: 2,
      });
      
      productManager.addProduct({
        title: 'sandwich',
        description: 'sandwich jamon y queso',
        price: 10,
        thumbnail: 'pan.jpg',
        code: 'P004',
        stock: 7,
      });
      
      productManager.addProduct({
        title: 'fritas',
        description: 'aceite con arina',
        price: 12,
        thumbnail: 'fritas.jpg',
        code: 'P005',
        stock: 33,
      });
      
      productManager.addProduct({
        title: 'hamburger',
        description: 'lo mejor de lo mejor',
        price: 15,
        thumbnail: 'amburguer.jpg',
        code: 'P006',
        stock: 70,
      });
      
      productManager.addProduct({
        title: 'pasteles',
        description: 'pastel de cordon bleu',
        price: 50,
        thumbnail: 'pasteles.jpg',
        code: 'P007',
        stock: 55,
      });
      
      productManager.addProduct({
        title: 'empanadas',
        description: 'de jamos con queso',
        price: 5,
        thumbnail: 'panada.jpg',
        code: 'P008',
        stock: 100,
      });
      
      productManager.addProduct({
        title: 'pizza',
        description: 'de peperoni',
        price: 19.99,
        thumbnail: 'pizza.jpg',
        code: 'P009',
        stock: 70,
      });
      
      productManager.addProduct({
        title: 'dumplings',
        description: 'bollos de carne',
        price: 30,
        thumbnail: 'dumplings.jpg',
        code: 'P010',
        stock: 200,
      })
  } catch (error) {
    console.error('Error:', error);
  }
})();

/* // Buscar todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Bucar producto por ID
const productById = productManager.getProductById(1);
console.log(productById);

// Actualizar el producto
const updated = productManager.updateProduct(1, { price: 12.99 });
if (updated) {
console.log('Product updated successfully');
} else {
console.log('Product not found');
}

// Borrar el producto
const deleted = productManager.deleteProduct(1);
if (deleted) {
console.log('Product deleted successfully');
} else {
console.log('Product not found');
} */