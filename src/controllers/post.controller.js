const postService = require('../services/post.service');
const { authenticateToken } = require('../utils/JWTToken');

const add = async (req, res) => {
  const { id } = await authenticateToken(req.headers.authorization)
  const { title, content, categoryIds } = req.body;
  const post = await postService.add(title, content, id, categoryIds);
  res.status(201).json(post);
};

module.exports = { add };
