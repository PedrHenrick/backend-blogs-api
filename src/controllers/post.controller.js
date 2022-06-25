const postService = require('../services/post.service');
const { authenticateToken } = require('../utils/JWTToken');

const getAll = async (_req, res) => {
  const allPosts = await postService.getAll();
  res.status(200).json(allPosts);
};

const getById = async (req, res) => {
  const postWithId = await postService.getById(req.params);
  res.status(200).json(postWithId);
};

const add = async (req, res) => {
  const { id } = await authenticateToken(req.headers.authorization);
  const { title, content, categoryIds } = req.body;
  const post = await postService.add(title, content, id, categoryIds);
  res.status(201).json(post);
};

module.exports = { getAll, getById, add };
