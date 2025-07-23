import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo(): Function | string {
        return User
    }

    async beforeInsert(event: InsertEvent<User>) {
        await this.hashPassword(event.entity);
    }

    async beforeUpdate(event: UpdateEvent<User>) {
        await this.hashPassword(event.entity as User);
    }

    private async hashPassword(user: User): Promise<void> {
        if (user.password) {
            user.password = await bcrypt.hash(user.password as string, 10);
        }
    }
}