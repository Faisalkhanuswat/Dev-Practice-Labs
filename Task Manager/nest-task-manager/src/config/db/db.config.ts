import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";


// Method 1
// export const dbConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: '',
//     password: '',
//     database: '',
//     entities: [__dirname + '/../models/**/*.schema.{ts,js}'],
//     synchronize: true,
// }

// Method 2 best for dynamic values
export const dbConfig: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/../models/**/*.schema.{ts,js}'],
        // autoLoadEntities: true,
        synchronize: config.get("NODE_ENV") !== 'production',
    }),
    async dataSourceFactory(options) {
        const dataSource = new DataSource(options!);
        await dataSource.initialize();
        Logger.log('Database Connected', 'DB Configuration');
        return dataSource;
    }
}