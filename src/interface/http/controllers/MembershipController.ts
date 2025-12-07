import { Request, Response } from "express";

import { PrismaMembershipRepository } from "../../../infrastructure/database/PrismaMembershipRepository";
import { PrismaUserRepository } from "../../../infrastructure/database/PrismaUserRepository";
import { PrismaGymRepository } from "../../../infrastructure/database/PrismaGymRepository";

import { AppError } from "../../../application/errors/AppError";

import { AddMembership } from "../../../application/use-cases/AddMembership";
import { RemoveMembership } from "../../../application/use-cases/RemoveMembership";



// Create repo instances (infrastructure layer)
const membershipRepo = new PrismaMembershipRepository();
const userRepo = new PrismaUserRepository();
const gymRepo = new PrismaGymRepository();

export class MembershipController {

    async add(req: Request, res: Response) {
        try {
            const { userId, gymId } = req.body;

            const useCase = new AddMembership(membershipRepo, userRepo, gymRepo);

            const membership = await useCase.execute({
                userId,
                gymId
            });

            return res.status(201).json(membership);

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async remove(req: Request, res: Response) {
        try {
            const { userId, gymId } = req.body;

            const useCase = new RemoveMembership(membershipRepo, userRepo, gymRepo);

            await useCase.execute(userId, gymId);

            return res.status(200).json({ message: "Membership removed" });

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
