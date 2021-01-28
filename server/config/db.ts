import { Sequelize } from 'sequelize'
import fs from "fs";

export const sequelize = new Sequelize(
    'server_events',
    '',
    '',
    {
        host: 'localhost',
        dialect: 'postgres',
        omitNull: true,
        logging: false,
        define: {
            timestamps: false
        }
    }
)

export const initDB = async () => {
    const query = fs.readFileSync('./db.sql').toString()
    await sequelize.query(query)
}