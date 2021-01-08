import * as entities from '../entity'
import { getRepository } from 'typeorm'
import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    req.repos = {
        Article: getRepository(entities.Article),
        Photo: getRepository(entities.Photo),
        User: getRepository(entities.User)
    }
    next()
}