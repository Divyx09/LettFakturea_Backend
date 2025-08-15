const { getTermsByLanguage } = require('../controllers/termController');

async function termsRoutes(fastify, options) {
  // GET /terms - Get terms by language
  fastify.get("/terms", async (request, reply) => {
    return getTermsByLanguage(request, reply, fastify);
  });
}

module.exports = termsRoutes;
