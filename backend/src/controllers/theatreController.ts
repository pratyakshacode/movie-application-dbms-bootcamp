

import { Request, Response } from "express";
import { Theatre } from "../entities/Theatre";
import { Seat } from "../entities/Seat";
import { defaultSeatMap } from "../utils/utils";
import { AppDataSource } from "../config/dbConnect";
import { FindManyOptions } from "typeorm";

export const addTheatre = async (req: Request, res: Response) => {

  const qr = AppDataSource.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();

  try {
    const { theatreName, location } = req.body;

    const newTheatre = qr.manager.create(Theatre, {
      name: theatreName,
      location,
    });

    await qr.manager.save(newTheatre);

    const seats = defaultSeatMap.map((s) =>
      qr.manager.create(Seat, {
        seatNumber: s.seatNumber,
        seatType: s.seatType,
        theatre: newTheatre,
      })
    );

    await qr.manager.save(seats);
    await qr.commitTransaction();

    return res.status(200).json({ status: "SUCCESS", message: "Theatre and seats added successfully" });

  } catch (error) {

    await qr.rollbackTransaction();
    console.error("Error in add Theatre", error);
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });

  } finally {
    await qr.release();
  }
};

export const getAllTheatres = async (req: Request, res: Response) => {
    try {

        const query: FindManyOptions = {}
        const theatres = await Theatre.find(query);
        return res.status(200).json({ status: "SUCCESS", message: "All theatres fetched!", data: theatres });

    } catch (error) {
        console.error("Error in getAllTheatres", error);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }
}

export const getAllSeatsOfTheatre = async (req: Request, res: Response) => {
  try {

    const { theatreId } = req.params;

    const query: FindManyOptions<Seat> = {
      where: {
        theatre: { id: theatreId }
      }
    }

    const allSeatsOfTheatre = await Seat.find(query);
    return res.status(200).json({ status: "SUCCESS", message: "Theatre seats fetched!", data:  allSeatsOfTheatre });

  } catch (error) {
      console.error("Error in getAllSeatsOfTheatre", error);
      return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
  }
}