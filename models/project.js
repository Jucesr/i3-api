const addCrudOperations = require('./crud');

const ENTITY_NAME = 'Project';

module.exports = (sequelize, DataTypes) => {

  let Project = sequelize.define(ENTITY_NAME, {
    name: {
      type: DataTypes.STRING(50)
    },
    code: {
      type: DataTypes.STRING(20),
      unique: true
    },
    description: {
      type: DataTypes.STRING(255)
    },
    status: {
      type: DataTypes.STRING(10)
    },
    type: {
      type: DataTypes.STRING(10)
    },
    currency: {
      type:   DataTypes.ENUM,
      values: ['MXN', 'USD']
    },
    uen: {
      type:   DataTypes.ENUM,
      values: ['MXL', 'MTY', 'TIJ', 'CDMX']
    },
    picture_url: {
      type: DataTypes.STRING(255)
    },
    progress: {
      type: DataTypes.DECIMAL(10,2)
    }
  }, { 
      tableName: ENTITY_NAME,
      underscored: true 
  });
  
  Project = addCrudOperations(Project, ENTITY_NAME);

  Project._getEstimates = function (id) {
    return this._findByIdAndDoAction(id, entity => entity.getEstimates())
  }

  Project._getParameters = function (id) {
    return this._findByIdAndDoAction(id, entity => entity.getParameters())
  }

  Project._getMaterials = function (id) {
    return this._findByIdAndDoAction(id, entity => entity.getMaterials())
  }

  Project.associate = function (models) {
    Project.hasMany(models.estimate)
    Project.hasMany(models.parameter)
    Project.hasMany(models.estimate_item)
    Project.hasMany(models.line_item)
    Project.hasMany(models.line_item_detail)
    Project.hasMany(models.material)
    Project.hasMany(models.material_quotation)
  }

  return Project;
}
