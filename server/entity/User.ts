import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Photo } from './Photo';
import { Article } from './Article';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column() 
    password: string;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];

    @OneToMany(() => Article, article => article.user)
    articles: Article[];
}
