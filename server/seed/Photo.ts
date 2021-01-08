import { User } from '../entity/User';
import { Photo } from '../entity/Photo';
import * as faker from 'faker';

const pics = ['pic1.png','pic2.png','pic3.png','pic4.png','pic5.png']

export default async (connection, count = 10) => {
    const userRepo = await connection.getRepository(User);
    const photoRepo = await connection.getRepository(Photo);

    for (let i = 0; i < count; i++) {
        const newPhoto = new Photo();
        const picName = faker.random.arrayElement(pics)
        newPhoto.name = picName
        newPhoto.file = picName
        newPhoto.user = await userRepo
            .createQueryBuilder("user")
            .orderBy("RAND()")
            .getOne()
        await photoRepo.save(newPhoto)
    }

}