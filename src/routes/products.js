const { 
  getAllProducts, 
  updateProduct, 
  createProduct, 
  deleteProduct 
} = require('../controllers/productController');

async function productRoutes(fastify, options) {
  // GET /products - Get all products
  fastify.get("/", async (request, reply) => {
    return getAllProducts(request, reply, fastify);
  });

  // POST /products - Create new product
  fastify.post("/", async (request, reply) => {
    return createProduct(request, reply, fastify);
  });

  // PUT /products/:id - Update product by ID
  fastify.put("/:id", async (request, reply) => {
    return updateProduct(request, reply, fastify);
  });

  // DELETE /products/:id - Delete product by ID
  fastify.delete("/:id", async (request, reply) => {
    return deleteProduct(request, reply, fastify);
  });
}

module.exports = productRoutes;
