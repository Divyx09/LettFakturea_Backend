// Get all products
const getAllProducts = async (request, reply, fastify) => {
  try {
    const products = await fastify.db.models.product.findAll();
    reply.send(products);
  } catch (err) {
    request.log.error("Error fetching products:", err);
    reply.code(500).send({ error: "Failed to fetch products" });
  }
};

// Update product by ID
const updateProduct = async (request, reply, fastify) => {
  const { id } = request.params;
  const updates = request.body;

  request.log.info("🔧 PUT /products/:id", { id, updates });

  try {
    const product = await fastify.db.models.product.findByPk(id);
    if (!product) {
      request.log.warn("⚠️ Product not found for ID:", id);
      return reply.code(404).send({ message: "Product not found" });
    }

    await product.update(updates);
    request.log.info("✅ Product updated:", product);

    reply.send(product);
  } catch (err) {
    request.log.error("❌ Update failed:", err);
    reply.code(500).send({ message: "Update failed", error: err.message });
  }
};

// Create new product
const createProduct = async (request, reply, fastify) => {
  try {
    const product = await fastify.db.models.product.create(request.body);
    request.log.info("✅ Product created:", product);
    reply.code(201).send(product);
  } catch (err) {
    request.log.error("❌ Product creation failed:", err);
    reply.code(500).send({ message: "Product creation failed", error: err.message });
  }
};

// Delete product by ID
const deleteProduct = async (request, reply, fastify) => {
  const { id } = request.params;

  try {
    const product = await fastify.db.models.product.findByPk(id);
    if (!product) {
      return reply.code(404).send({ message: "Product not found" });
    }

    await product.destroy();
    request.log.info("✅ Product deleted:", id);
    reply.send({ message: "Product deleted successfully" });
  } catch (err) {
    request.log.error("❌ Delete failed:", err);
    reply.code(500).send({ message: "Delete failed", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct
};
