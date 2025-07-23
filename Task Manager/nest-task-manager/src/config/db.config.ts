import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

// export default TypeOrmModule.forRoot({
//         type: 'postgres',
//         host: process.env.DB_HOST,
//         port: +process.env.DB_PORT!,
//         username: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         entities: [__dirname + '/../**/*.entity.ts'],
//         synchronize: process.env.NODE_ENV !== 'production',
//     })
// )

export default TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
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
    inject: [ConfigService],
    async dataSourceFactory(options) {
        const dataSource = new DataSource(options!);
        await dataSource.initialize();
        Logger.log('Database Connected', 'DB Configuration');
        return dataSource;
    }
})