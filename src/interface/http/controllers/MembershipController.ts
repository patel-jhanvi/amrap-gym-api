import { Request, Response } from "express";


import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";

import { AppError } from "../../../application/errors/AppError";

import { AddMembership } from "../../../application/use-cases/AddMembership";
import { RemoveMembership } from "../../../application/use-cases/RemoveMembership";

export class MembershipController {
    constructor(
        private membershipRepo: IMembershipRepository,
        private userRepo: IUserRepository,
        private gymRepo: IGymRepository
    ) { }

    async add(req: Request, res: Response) {
        try {
            const { userId, gymId } = req.body;

            const useCase = new AddMembership(
                this.membershipRepo,
                this.userRepo,
                this.gymRepo
            );

            const membership = await useCase.execute({ userId, gymId });

            return res.status(201).json(membership);
        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { userId, gymId } = req.body;

            const useCase = new RemoveMembership(
                this.membershipRepo,
                this.userRepo,
                this.gymRepo
            );

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
