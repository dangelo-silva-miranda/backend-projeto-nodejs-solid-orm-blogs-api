/*
  Material consultado sobre Joi
  https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation
  https://joi.dev/api/?v=17.4.2#general-usage
*/
const Joi = require('joi');

const id = Joi.number().integer().positive();
const text = Joi.string();
const userDataSchema = Joi.object().keys({
  id,
  displayName: text.min(8),
  email: text.email().required(),
  password: text.length(6).required(),
  image: text,
});

const categoryDataSchema = Joi.object().keys({
  id,
  name: text.required(),
});

const blogPostDataSchema = Joi.object().keys({
  id,
  title: text.required(),
  content: text.required(),
  categoryIds: Joi.array().items(Joi.number()).min(1).required(),
});

const postsCategoryDataSchema = Joi.object().keys({
  postId: id,
  categoryId: id,
});

module.exports = {
  userDataSchema,
  categoryDataSchema,
  blogPostDataSchema,
  postsCategoryDataSchema,
};