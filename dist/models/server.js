"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
exports.Server = db_1.sequelize.define('server', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    server_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['onprem', 'virtual']],
                msg: 'O servidor deve ser do tipo onprem ou virtual'
            }
        }
    }
}, {
    freezeTableName: true,
    indexes: [
        {
            name: "server_pkey",
            unique: true,
            fields: [
                { name: "name" },
            ]
        },
    ]
});
//# sourceMappingURL=server.js.map