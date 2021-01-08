import * as faker from 'faker';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
import { Article } from '../entity/Article';

const generateContent = () => {
    let content = ''
    for(let j = 0;j < 10;j++) {
        const newText = faker.lorem.paragraphs()
        content = content.concat(newText)
        content = content.concat(' /n ')
    }
    return content
}
export default async (connection, count = 10) => {
    const userRepo = await connection.getRepository(User);
    const photoRepo = await connection.getRepository(Photo);
    const articleRepo = await connection.getRepository(Article);
    for (let i = 0; i < count; i++) {
        const newArticle = new Article();
        newArticle.photo = await photoRepo
            .createQueryBuilder('photo')
            .orderBy('RAND()')
            .getOne()

        newArticle.user = await userRepo
            .createQueryBuilder("user")
            .orderBy("RAND()")
            .getOne()
        newArticle.content = generateContent()
        newArticle.title = faker.lorem.sentence()
        await articleRepo.save(newArticle)
    }


}