'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'author_id',
        references: {
          model: 'authors', // aqui informamos que a relação será com nossa model 'authors'
          key: 'id', // aqui informamos qual vai ser a coluna que será relacionada (no caso, a coluna 'id')
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        filed: 'genre_id',
        references: {
          model: 'genres', // aqui informamos que a relação será com nossa model 'genres'
          key: 'id', // aqui informamos qual vai ser a coluna que será relacionada (no caso, a coluna 'id')
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('books');
  }
};
