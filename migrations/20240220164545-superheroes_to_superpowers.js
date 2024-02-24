'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('superheroes_to_superpowers', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      heroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'hero_id',
        references: {
          model: 'superheroes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      powerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'power_id',
        references: {
          model: 'superpowers',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('superheroes_to_superpowers', {
      fields: ['hero_id', 'power_id'],
      type: 'unique',
      name: 'unique-pair-constraint'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('superheroes_to_superpowers');
  }
};
