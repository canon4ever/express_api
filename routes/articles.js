var express = require('express');
var router = express.Router();
var models = require('../models');
var Op = models.Sequelize.Op

// 文章列表
router.get('/', async function (req, res, next) {
    var currentPage = parseInt(req.query.currentPage) || 1;
    var pageSize = parseInt(req.query.pageSize) || 2;
    var where = {};

    // 模糊查询标题
    var title = req.query.title;

    if (title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    }

    var result = await models.Article.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        articles: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
});

// 新增
router.post('/', async function (req, res, next) {
    var article = await models.Article.create(req.body)
    res.json({article: article});
});

// 查询单条文章
router.get('/:id', async function (req, res, next) {
    var article = await models.Article.findOne({
        where: {id: req.params.id},
        include: [models.Comment],
    });
    res.json({article: article});
});

// 修改
router.put('/:id', async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    article.update(req.body);
    res.json({article: article});
});

// 删除
router.delete('/:id', async function (req, res, next) {
    var article = await models.Article.findByPk(req.params.id);
    article.destroy();
    res.json({msg: '删除成功'});
});

module.exports = router;
