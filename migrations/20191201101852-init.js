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

    queryInterface.addConstraint("users", ["email"], {
      type: 'unique',
      name: 'users_email_uk'
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

    await queryInterface.addConstraint("health_hart_rates", ["userId", "date", "device"], {
      type: 'unique',
      name: 'health_hart_rates_uk'
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

    queryInterface.addConstraint("health_steps", ["userId", "periodFrom", "periodTo", "device"], {
      type: 'unique',
      name: 'health_steps_uk'
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

    await queryInterface.addConstraint("health_weights", ["userId", "date", "device"], {
      type: 'unique',
      name: 'health_weights_uk'
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

    await queryInterface.addConstraint("health_heights", ["userId", "date", "device"], {
      type: 'unique',
      name: 'health_heights_uk'
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

    await queryInterface.addConstraint("health_mass_indexes", ["userId", "date", "device"], {
      type: 'unique',
      name: 'health_mass_indexes_uk'
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

    await queryInterface.addConstraint("health_moods", ["userId", "date", "device"], {
      type: 'unique',
      name: 'health_moods_uk'
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
