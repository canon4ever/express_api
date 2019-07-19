'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Articles', [
            {
                title: '武汉最好吃的小吃是什么？',
                content: "肯定是三鲜豆皮，热干面一点都不好吃！",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: '今天天气可真好啊',
                content: "狂风暴雨特别凉快哦，欢迎每年来武汉看海！",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Articles', null, {});
    }
};
