import * as entities from '../../server/entity'
import { Repository } from 'typeorm'

declare global { 
    namespace Express {
        interface Request {
            repos: Repos
        }
    }
}

export interface Repos {
    Article: Repository<entities.Article>,
    Photo: Repository<entities.Photo>,
    User: Repository<entities.User>
}
