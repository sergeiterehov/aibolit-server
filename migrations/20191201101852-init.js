"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.createTable("health_hart_rates", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      date: Sequelize.DATE,
      device: Sequelize.STRING,
      avgVal: Sequelize.FLOAT,
    });

    await queryInterface.createTable("health_steps", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      periodFrom: Sequelize.DATE,
      periodTo: Sequelize.DATE,
      device: Sequelize.STRING,
      val: Sequelize.FLOAT,
    });

    await queryInterface.createTable("health_weights", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      date: Sequelize.DATE,
      device: Sequelize.STRING,
      val: Sequelize.FLOAT,
    });

    await queryInterface.createTable("health_heights", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      date: Sequelize.DATE,
      device: Sequelize.STRING,
      val: Sequelize.FLOAT,
    });

    await queryInterface.createTable("health_mass_indexes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      date: Sequelize.DATE,
      device: Sequelize.STRING,
      val: Sequelize.FLOAT,
    });

    await queryInterface.createTable("health_moods", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        allowNull: false
      },
      date: Sequelize.DATE,
      device: Sequelize.STRING,
      smile: Sequelize.STRING,
    });

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "test@local.host",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("health_hart_rates");
    await queryInterface.dropTable("health_steps");
    await queryInterface.dropTable("health_weights");
    await queryInterface.dropTable("health_heights");
    await queryInterface.dropTable("health_mass_indexes");
    await queryInterface.dropTable("health_moods");
    await queryInterface.dropTable("users");
  }
};
