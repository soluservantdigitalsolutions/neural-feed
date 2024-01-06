const ArticleModel = require("../Models/article.model.js");
const createError = require("../error.js");

const postArticle = async (req, res, next) => {
  try {
        const imageUrl = req.file ? req.file.path : null;

const newArticle = await ArticleModel.create({
  authorId: req.userId,
  authorName: req.username,
  title: req.body.title,
  content: req.body.content,
  tags: req.body.tags,
  tests: req.body.tests,
  imageUrl: imageUrl, 
});

    res.status(201).json(newArticle);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) return next(createError(404, "Article not found"));
    res.status(200).json(article);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) return next(createError(404, "Article not found"));
    if (req.userId !== article.authorId)
      return next(createError(403, "Unauthorized"));

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tests: req.body.tests, // Update tests here
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) return next(createError(404, "Article not found"));
    if (req.userId !== article.authorId)
      return next(createError(403, "Unauthorized"));

    await ArticleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports = {
  postArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
};
