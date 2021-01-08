import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as entities from './entity';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { default as controllers } from './controller'
import { UNSUCCESSFUL_LOGIN_CREDENTIALS, UNEXPECTED_ERROR } from './response';
import { Request, Response, NextFunction } from "express";
import { createConnection, getRepository }  from "typeorm";
;


const verifySession = async (req: Request, res: Response, next: NextFunction) => {
    if(await ensureLoggedIn(req)) {
        next()
    } else {
        res.redirect('/login')
    }
}

const ensureLoggedIn = async (req: Request) => {
    const username = req.session.username

    if(!username) {
        return false
    }

    const found = await req.repos.User.findOne({
        where: {
            username
        }
    })

    return found;
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    try {
        const user = await req.repos.User.findOne({
            where: {
                username
            }
        })

        if(user && user.password === password) {
            req.session.username = username;
            res.sendStatus(302)
        } else {
            res.status(403).json({
                message: UNSUCCESSFUL_LOGIN_CREDENTIALS
            })
        }

    } catch(err) {
        return res.status(500).json({
            message: UNEXPECTED_ERROR
        })
    }
}

createConnection().then(connection => {4
    const frontEndPath = "../frontend/build"
    const app = express();

    app.use(express.json());
    app.use(session({ 
        secret: 'chris phan',
        resave: true,
        saveUninitialized: true
    }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use((req: Request, res: Response, next: NextFunction) => {
        req.repos = {
            Article: getRepository(entities.Article),
            Photo: getRepository(entities.Photo),
            User: getRepository(entities.User)
        }
        next()
    })
    app.get('/login',async (req: Request, res: Response, next: NextFunction) => {
        if(await ensureLoggedIn(req)) {
            res.redirect('/')
        }
        next()
    })
    app.get('/',verifySession)

    app.post('/logout',(req: Request, res: Response, next: NextFunction) => {
        console.log("HERE")
        req.session.destroy((err) => {
            if(err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    })
    app.post('/authenticate', authenticate)
    app.use('/api', controllers)


    app.use(express.static(path.resolve(__dirname,frontEndPath)))
    app.get('*',(req: Request, res: Response, next: NextFunction) => {
        res.sendFile(path.resolve(__dirname,frontEndPath, "index.html"))
    })
    
    

    app.listen(5000);
    console.log("SERVER RUNNING LOCALHOST:5000")
})

