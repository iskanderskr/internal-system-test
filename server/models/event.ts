import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db'

import { Server } from './server'

export interface EventAttributes extends Model {
    id: number;
    server: string;
    description: string;
    server_name: string;
    created_at: Date;
}

export const Event = sequelize.define<EventAttributes>('event',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        server_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
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
    }
)

Server.hasMany(Event, { foreignKey: 'server_name', sourceKey: 'name' })
Event.belongsTo(Server, { foreignKey: 'server_name', targetKey: 'name' })