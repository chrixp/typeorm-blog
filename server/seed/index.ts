import ArticleSeed from './Article'
import PhotoSeed from './Photo'
import UserSeed from './User'
import { Connection } from 'typeorm'

export const Seed = async (connection: Connection) => {
    await clearDb(connection)
    await UserSeed(connection)
    await PhotoSeed(connection)
    await ArticleSeed(connection)
}

const clearDb = async (connection: Connection) => {
    const entities = [
        { name: 'Article', tableName: 'article' },
        { name: 'Photo', tableName: 'photo' },
        { name: 'User', tableName: 'user'}
    ]
    for (const entity of entities) {
        const repository = await connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      }
}