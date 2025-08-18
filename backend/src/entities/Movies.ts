import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ShowTime } from "./ShowTime"

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    image_url: string

    @Column()
    title: string

    @Column()
    type: string

    @Column()
    duration: string

    @Column()
    rating: string
    
    @Column("float")
    score: number

    @Column("longtext")
    description: string

    @OneToMany(() => ShowTime, (showTime) => showTime.movie)
    showTimes: ShowTime[]
}