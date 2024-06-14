import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOptions: DataSourceOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "gianella",
    "database": "medcontroldb",
    "entities": ["dist/**/*.entity.js"],
    "migrations": ["dist/database/migrations/*.js"],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource