import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movies";
import { Booking } from "./Booking";
import { Theatre } from "./Theatre";

@Entity()
export class ShowTime {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "timestamp" })
    startTime: Date;

    @Column({ type: "timestamp" })
    endTime: Date

    @Column()
    price: number

    @ManyToOne(() => Movie, (movie) => movie.showTimes)
    movie: Movie;

    @OneToMany(() => Booking, (booking) => booking.showTime)
    bookings: Booking[];

    @ManyToOne(() => Theatre, (theatre) => theatre.showTimes)
    theatre: Theatre
}