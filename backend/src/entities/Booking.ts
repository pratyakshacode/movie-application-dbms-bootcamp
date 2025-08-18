import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from "./User";
import { ShowTime } from "./ShowTime";
import { BookingSeat } from "./BookingSeat";
import { Payment } from "./Payment";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.bookings)
    user: User;

    @ManyToOne(() => ShowTime, (showTime) => showTime.bookings)
    showTime: ShowTime;

    @Column()
    bookingTime: Date;

    @Column()
    status: string; // confirmed, cancelled, pending

    @OneToMany(() => BookingSeat, (bookingSeat) => bookingSeat.booking)
    bookingSeats: BookingSeat[];

    @OneToOne(() => Payment, (payment) => payment.booking)
    payment: Payment;
}