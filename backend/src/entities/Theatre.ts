import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./Seat";
import { ShowTime } from "./ShowTime";

@Entity()
export class Theatre extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    location: string

    @Column()
    capacity: number

    @OneToMany(() => Seat, (seat) => seat.theatre)
    seats: Seat[];

    @OneToMany(() => ShowTime, (showTime) => showTime.theatre)
    showTimes: ShowTime[]
}