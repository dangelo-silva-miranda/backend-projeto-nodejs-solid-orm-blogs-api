const { StatusCodes } = require('http-status-codes');
const { BlogPost, PostsCategory, Category } = require('../models');
const { blogPostDataSchema } = require('./schemas');

/*
  Material consultado sobre como descobrir se um array está contido em outro
  https://stackoverflow.com/a/53606357
*/
const areCategoryIdsExists = async ({ categoryIds }) => {
  /*
    // Solução 1 
    // Obtem no DB os ids de Category
    let result = await Category.findAll({ attributes: ['id'] });

    // Transforma result em um array de ids
    result = result.reduce((acc, { dataValues: { id } }) => { acc.push(id); return acc; }, []);
    
    // Retorna se o array categoryIds está contido em result
    return categoryIds.every((id) => result.includes(id));
  */

  // Solução 2
  // Verifica no DB a quantidade de ids que estão em categoryIds
  const result = await Category.findAndCountAll({ where: { id: categoryIds } })
  // e retorna se essa quantidade é igual a que está em categoryIds
  .then(({ count }) => count === categoryIds.length);
  return result;
};

const createPost = async ({ title, content, userId, categoryIds }) => {
  const { error } = blogPostDataSchema.validate({ title, content, userId, categoryIds });
  if (error) { // error.isJoi indentifica se o erro foi tipo Joi
    const { message } = error.details[0];    
    return { code: StatusCodes.BAD_REQUEST, message };
  }

  const categoryIdsExists = await areCategoryIdsExists({ categoryIds });
  if (!categoryIdsExists) {
    return { code: StatusCodes.BAD_REQUEST, message: '"categoryIds" not found' };
  }

  // const result = await BlogPost.create({ 
  //   title, content, user: { id: userId }, categories: [categoryIds], 
  // });

  // const result = await BlogPost.create({ 
  //   title, content, userId, 
  // });
  
    // const result = await BlogPost.create({
    //   title,
    //   content,
    //   userId, 
    //   categories: categoryIds },
    //   {
    //     include: {
    //       model: PostsCategories,
    //       // through: 'PostsCategory',
    //       as: 'categories',
    //       attributes: ['categoryId'],
    //     },
    //   });

    const { dataValues } = await BlogPost.create({ title, content, userId });
    const post = dataValues;
    delete post.updated;
    delete post.published;

    const { id: postId } = post;

    categoryIds.forEach(async (categoryId) => {
      await PostsCategory.create({ postId, categoryId });      
    });

  return { code: StatusCodes.CREATED, post };
};

module.exports = {
  createPost,
};