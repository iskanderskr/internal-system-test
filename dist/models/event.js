"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const server_1 = require("./server");
exports.Event = db_1.sequelize.define('event', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    server_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    freezeTableName: true,
    indexes: [
        {
            name: "event_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        },
    ]
});
server_1.Server.hasMany(exports.Event, { foreignKey: 'server_name', sourceKey: 'name' });
exports.Event.belongsTo(server_1.Server, { foreignKey: 'server_name', targetKey: 'name' });
//# sourceMappingURL=event.js.map