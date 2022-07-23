"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserRant = exports.RantFactory = exports.Rants = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Rants extends sequelize_1.Model {
}
exports.Rants = Rants;
function RantFactory(sequelize) {
    Rants.init({
        rantId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rant: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        tableName: 'rants',
        freezeTableName: true,
        sequelize
    });
}
exports.RantFactory = RantFactory;
function AssociateUserRant() {
    user_1.Users.hasMany(Rants, { foreignKey: 'userId' });
    Rants.belongsTo(user_1.Users, { foreignKey: 'userId' });
}
exports.AssociateUserRant = AssociateUserRant;
