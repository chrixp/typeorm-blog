import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/User';


export default async (connection, count = 10) => {
    const userRepo = await connection.getRepository(User);

    for (let i = 0; i < count; i++) {
        const newUser = new User();
        newUser.firstName = faker.name.firstName();
        newUser.lastName = faker.name.lastName();
        newUser.username = faker.internet.userName().toLowerCase();
        newUser.password = faker.internet.password();
        await userRepo.save(newUser);
    }

        /*bcrypt.hash(faker.internet.password(), 5)
            .then(async hash => { 
                newUser.password = hash 
                await userRepo.save(newUser)
            })

        }*/
}