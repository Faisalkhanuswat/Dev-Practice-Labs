import { EntitySchema } from "typeorm";
import { User } from "./user.entity";

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    tableName: "users",
    target: User,
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: "uuid",
        },
        name: {
            type: String,
            length: 12
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String
        }
    }
})