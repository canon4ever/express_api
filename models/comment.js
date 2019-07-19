'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    articleId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Article);
  };
  return Comment;
};
