"use strict";

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable("health_hart_rate", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      date: Sequelize.DATE,
      device: Sequelize.STRING,
      avgVal: Sequelize.FLOAT,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("health_hart_rate");
  }
};
