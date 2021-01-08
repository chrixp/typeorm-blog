import * as entities from './entity'
import { getRepository, Repository } from 'typeorm';

interface Repos {
    [key: string]: Repository<entities.Article>
}

const repos: Repos = {}

for (const entity in entities) {
    repos[entity.toString()] = getRepository(entity)
}

console.log(repos)
export default repos