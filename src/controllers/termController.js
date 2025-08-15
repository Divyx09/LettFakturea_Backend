// Get terms by language
const getTermsByLanguage = async (request, reply, fastify) => {
  const { language } = request.query;

  if (!language) {
    return reply.status(400).send({ error: "Language query is required" });
  }

  try {
    const result = await fastify.db.models.term.findAll({
      where: { language },
    });

    if (result.length === 0) {
      return reply.status(404).send({ error: "No terms found for this language" });
    }

    // Transform the data to the desired format
    const transformedData = result.map(item => {
      // Create terms object
      const terms = {
        close: item.button || "",
        terms: item.term || ""
      };

      // Split content1 and content2 by paragraphs and sentences
      let allContent = [];
      
      if (item.content1) {
        // Split by double newlines first, then by single newlines for more granular control
        const content1Paragraphs = item.content1.split('\n\n').filter(part => part.trim() !== '');
        allContent = allContent.concat(content1Paragraphs);
      }

      if (item.content2) {
        const content2Paragraphs = item.content2.split('\n\n').filter(part => part.trim() !== '');
        allContent = allContent.concat(content2Paragraphs);
      }

      // Add each content part as terms_text_X
      allContent.forEach((content, index) => {
        // Clean up the content and add bold tags where needed
        let cleanContent = content.trim();
        
        // Replace specific patterns for formatting
        if (cleanContent.startsWith('BY clicking')) {
          cleanContent = cleanContent.replace('BY clicking', '<b>BY</b> clicking');
        }
        
        terms[`terms_text_${index + 1}`] = cleanContent;
      });

      return {
        language: item.language,
        navigation: {
          contact_us: item.opt5 || "",
          order: item.opt2 || "",
          home: item.opt1 || "",
          our_customer: item.opt3 || "",
          about_us: item.opt4 || ""
        },
        terms: terms
      };
    });

    return reply.send(transformedData);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: "Database query failed" });
  }
};

module.exports = {
  getTermsByLanguage
};
