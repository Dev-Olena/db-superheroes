'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Superhero.belongsToMany(models.Superpower, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Superhero.hasMany(models.Image, {
        foreignKey: 'heroId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Superhero.init({
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nick_name',
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'real_name',
      validate: {
        notEmpty: true
      }
    },
    originDescription: {
      type: DataTypes.TEXT,
      field: 'origin_description'
    },
    catchPhrase: {
      type: DataTypes.STRING,
      field: 'catch_phrase'
    }
  }, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheroes',
    underscored: true,
  });
  return Superhero;
};