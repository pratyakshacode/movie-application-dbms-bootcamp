import { Request, Response } from "express"
import { Theatre } from "../entities/Theatre";

export const addTheatre = async (req: Request, res: Response) => {
    try {
        const { theatreName, location } = req.body;
        const newTheatre = Theatre.create({
            name: theatreName,
            location
        });

        await Theatre.save(newTheatre);
        return res.status(200).json({ status: "SUCCESS", message: "Theatre Added" });

    } catch (error) {
        console.log("Error in add Theatre", error);
        return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error: error.message });
    }

}