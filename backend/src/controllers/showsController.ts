import { Request, Response } from "express"
import { ShowTime } from "../entities/ShowTime";
import { FindManyOptions, FindOneOptions, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
export const addShow = async (req: Request, res: Response) => {
    try {

        const { startTime, endTime, movie, theatre, price } = req.body;

        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        const query: FindOneOptions<ShowTime> = {
            where: {
                startTime: LessThanOrEqual(endDate),
                endTime: MoreThanOrEqual(startDate),
                movie: { id: movie },
                theatre: { id: theatre }
            }
        }

        const showTime = await ShowTime.findOne(query);

        if(showTime) {
            return res.status(400).json({ status: "BAD_REQUEST", message: "There is already a show on this theatre and for selected movie." });
        }
        
        const newShow = ShowTime.create({
            startTime: startDate,
            endTime: endDate,
            movie,
            theatre,
            price
        });

        await ShowTime.save(newShow);
        return res.status(200).json({ status: "SUCCESS", message: "Show added for movie." });

    } catch (error) {
        console.error("Error in addShow", error.message);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", message: "Error in adding show for movie." });
    }
}

export const getAllShowsForMovie =  async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params;

        const query: FindManyOptions<ShowTime> = {
            where: {
                movie: { id: movieId },
            },
            relations: ['theatre'],
            select: {
                theatre: { 
                    id: true, 
                    name: true
                }
            }
        }

        const showTime = await ShowTime.find(query);
        return res.status(200).json({ status: "SUCCESS" , message: "Shows fetched!", data: showTime });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "SUCCESS" , error: error.message });
    }
}