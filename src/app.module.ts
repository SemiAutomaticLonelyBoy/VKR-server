import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { User } from "./users/user.model";
import { AuthModule } from './auth/auth.module';
import { TablesModule } from './tables/tables.module';
import { UserModule } from './user/user.module';
import {Tables} from "./tables/table.model";
import { ProjectsModule } from './projects/projects.module';
import {Projects} from "./projects/project.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Tables, Projects],
            autoLoadModels: true,
        }),
        UsersModule,
        AuthModule,
        TablesModule,
        UserModule,
        ProjectsModule,
    ]
})
export class AppModule {}