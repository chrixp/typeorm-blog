import * as express from 'express'

const articleRouter = express.Router();

articleRouter.get('/articles',(async (req,res) => {
        const articles = await req.repos.Article.createQueryBuilder('article')
            .leftJoinAndSelect('article.photo','photo')
            .leftJoinAndSelect('article.user','user')
            .select(['photo.file','article.title','article.content','article.id','user.firstName','user.lastName'])
            .execute()
        res.send(articles)
    }))

articleRouter.get('/articles/mine',(async (req,res) => {
    
}))

export { articleRouter }