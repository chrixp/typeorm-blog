import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Article } from './Article';
import { User } from './User';
@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    file: string;

    @ManyToOne(() => User, user => user.photos)
    user: User;

    @OneToMany(() => Article, article => article.photo)
    articles: Article[];
}