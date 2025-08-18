import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Booking } from "./Booking";
import { Seat } from "./Seat";

@Entity()
export class BookingSeat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Booking, (booking) => booking.bookingSeats)
  booking: Booking;

  @ManyToOne(() => Seat, (seat) => seat.bookingSeats)
  seat: Seat;
}