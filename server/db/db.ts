import { Sequelize } from "@sequelize/core";
import { Logging } from '../shared/logger';
import { User } from '../model/user.model';
import { PostgresDialect } from '@sequelize/postgres';
import { exit } from 'process';

let db = undefined;

export function getDb() {
    return db;
}

export async function connectDB() {
    Logging.info(`Connecting to database at: ${process.env.PSQL_DB_NAME}:${process.env.PSQL_DB_HOST}:${process.env.PSQL_DB_PORT}/${process.env.PSQL_DB_USERNAME}`);
    const now = new Date();
    db = new Sequelize({
        dialect: PostgresDialect,
        database: process.env.PSQL_DB_NAME,
        user: process.env.PSQL_DB_USERNAME,
        password: process.env.PSQL_DB_PWD,
        host: process.env.PSQL_DB_HOST,
        port: parseInt(process.env.PSQL_DB_PORT),
        ssl: true,
        clientMinMessages: 'notice',
        models: [User],
    });
    Logging.config(db.toString());
    db.authenticate().then(async () => {
        Logging.info("Database connection established. Took " + (+new Date() - +now) + "ms");
    }).catch(async (err) => {
        Logging.severe("Database Errored Out after " + (+new Date() - +now) + "ms with: " + err);
        await db.close();
        exit(-1);
    });
}
