const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { code, message, category } = await categoryService.createCategory(req.body);

  if (!category) {
    return res.status(code).json({ message });  
  }
  
  return res.status(code).json(category);
};

module.exports = { createCategory };