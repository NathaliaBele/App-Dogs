const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    }, 
    image: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
      height: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.STRING(),
    },
    temperament: {
      type: DataTypes.ARRAY(DataTypes.STRING())
    },
    originApi: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};
