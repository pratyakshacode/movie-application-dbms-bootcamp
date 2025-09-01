import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { Booking } from "./Booking";
import { Seat } from "./Seat";

@Entity()
export class BookingSeat extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Booking, (booking) => booking.bookingSeats)
  booking: Booking;

  @ManyToOne(() => Seat, (seat) => seat.bookingSeats)
  seat: Seat;
}