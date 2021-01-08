import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Photo } from './Photo';
import { User } from './User';
@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column("longtext")
    content: string

    @ManyToOne(() => Photo, photo => photo.articles)
    photo: Photo;

    @ManyToOne(() => User, user => user.articles)
    user: User;

}