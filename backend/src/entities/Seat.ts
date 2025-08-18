import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Theatre } from "./Theatre";
import { BookingSeat } from "./BookingSeat";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  seatNumber: string; // e.g., A1, A2

  @Column()
  seatType: string; // Regular, Premium, VIP

  @ManyToOne(() => Theatre, (theatre) => theatre.seats)
  theatre: Theatre;

  @OneToMany(() => BookingSeat, (bookingSeat) => bookingSeat.seat)
  bookingSeats: BookingSeat[];
}