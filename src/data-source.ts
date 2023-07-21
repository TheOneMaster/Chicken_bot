import "reflect-metadata";
import { DataSource } from "typeorm";
import { Account } from "./entity/Account";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Account],
  migrations: [],
  subscribers: [],
});
