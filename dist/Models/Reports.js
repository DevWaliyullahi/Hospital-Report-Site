"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const uuid_1 = require("uuid");
class Report extends sequelize_1.Model {
}
Report.init({
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hospitalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bloodGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    genotypes: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bloodPressure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hiv_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hepatitis_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
}, {
    sequelize: database_config_1.default,
    modelName: 'Reports',
    hooks: {
        beforeValidate: (report) => {
            if (!report.id) {
                report.id = (0, uuid_1.v4)();
            }
        },
    },
});
exports.default = Report;
