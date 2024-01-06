const router = require("express").Router();
const { postArticle, getArticles, getArticle, updateArticle, deleteArticle } = require("./Controllers/article.controller.js");
const { parser } = require("./config/cloudinary.js");
const verifyToken = require("./middleware/verifyToken.js");

router.post("/articles", verifyToken, parser.single("image"), postArticle);
router.get("/articles", getArticles);
router.get("/articles/:id", getArticle);
router.put("/articles/:id", verifyToken, updateArticle);
router.delete("/articles/:id", verifyToken, deleteArticle);

module.exports = router;
