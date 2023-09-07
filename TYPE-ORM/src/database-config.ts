import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

const porta = process.env.DB_PORT as number | undefined;

export const dataBaseConfig = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: porta,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: [`${__dirname}/**/model/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
