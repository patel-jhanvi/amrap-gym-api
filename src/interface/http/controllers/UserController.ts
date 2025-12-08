import { Request, Response } from "express";

import { CreateUser } from "../../../application/use-cases/CreateUser";

import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IMembershipRepository } from "../../../domain/repositories/IMembershipRepository";
import { IGymRepository } from "../../../domain/repositories/IGymRepository";

import { ListUserGyms } from "../../../application/use-cases/ListUserGyms";
import { UpdateUser } from "../../../application/use-cases/UpdateUser";

import { AppError } from "../../../application/errors/AppError";

export class UserController {
    constructor(
        private userRepo: IUserRepository,
        private membershipRepo: IMembershipRepository,
        private gymRepo: IGymRepository
    ) { }


    async create(req: Request, res: Response) {
        try {
            const useCase = new CreateUser(this.userRepo);

            const user = await useCase.execute({
                name: req.body.name,
                email: req.body.email,
                dateOfBirth: new Date(req.body.dateOfBirth),
                fitnessGoal: req.body.fitnessGoal
            });

            return res.status(201).json(user);

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const users = await this.userRepo.findAll();
            return res.json(users);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }

    async listGyms(req: Request, res: Response) {
        try {
            const userId = req.params.id;

            const useCase = new ListUserGyms(this.membershipRepo, this.gymRepo);
            const gyms = await useCase.execute(userId);

            return res.json(gyms);

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = await this.userRepo.findById(id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.json(user);

        } catch (err: any) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, dateOfBirth, fitnessGoal } = req.body;

            const useCase = new UpdateUser(this.userRepo);

            const updated = await useCase.execute(id, {
                name,
                email,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                fitnessGoal
            });

            return res.json(updated);

        } catch (err: any) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            }

            return res.status(500).json({ error: "Internal server error" });
        }
    }

}
