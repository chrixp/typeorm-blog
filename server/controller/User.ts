import * as express from 'express'

const userRouter = express.Router();

userRouter.get('/users',(async (req,res) => {
        const users = await req.repos.User.find()
        return res.send(users)
    })
)

userRouter.get('/users/name',(async (req,res) => {
    const username = req.session.username;
    const user = await req.repos.User.findOne({
        select: ['firstName','lastName'],
        where: {
            username
        }
    })
    if(!user) {
        res.sendStatus(404)
    } else {
        res.send(user)
    }
    })
)

export {
    userRouter
}