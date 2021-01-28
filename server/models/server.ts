import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/db'

export interface ServerAttributes extends Model {
    name: string;
    created_at: Date;
    server_type: string;
}

export const Server = sequelize.define<ServerAttributes>('server',
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        server_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['onprem', 'virtual']],
                    msg: 'O servidor deve ser do tipo onprem ou virtual'
                }
            }
        }
    },
    {
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
    }
)