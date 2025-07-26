import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";


// Method 1
// export default TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: +process.env.DB_PORT!,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: [__dirname + '/../models/**/*.schema.{ts,js}'],
//     synchronize: process.env.NODE_ENV !== 'production',
// })

// Method 2
// export default TypeOrmModule.forRootAsync({
//     inject: [ConfigService],
//     useFactory: (config: ConfigService) => ({
//         type: 'postgres',
//         host: config.get('DB_HOST'),
//         port: +config.get('DB_PORT'),
//         username: config.get('DB_USER'),
//         password: config.get('DB_PASSWORD'),
//         database: config.get('DB_NAME'),
//         entities: [__dirname + '/../models/**/*.schema.{ts,js}'],
//         synchronize: config.get("NODE_ENV") !== 'production',
//     }),
//     async dataSourceFactory(options) {
//         const dataSource = new DataSource(options!);
//         await dataSource.initialize();
//         Logger.log('Database Connected', 'DB Configuration');
//         return dataSource;
//     }
// })

// Method 3 best
@Module({
    imports: [TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            type: 'postgres',
            host: config.get('DB_HOST'),
            port: +config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            entities: [__dirname + '/../models/**/*.schema.{ts,js}'],
            synchronize: config.get("NODE_ENV") !== 'production',
        }),
        async dataSourceFactory(options) {
            const dataSource = new DataSource(options!);
            await dataSource.initialize();
            Logger.log('Database Connected', 'DB Configuration');
            return dataSource;
        }
    })],
    exports: [TypeOrmModule],
})
export class DbModule { }