import { injectable, inject } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { TOKENS } from "../../../infrastructure/di/tokens";

import { CreateUser } from "../../../application/use-cases/CreateUser";
import { UpdateUser } from "../../../application/use-cases/UpdateUser";
import { ListUserGyms } from "../../../application/use-cases/ListUserGyms";

import { IUserRepository } from "../../../domain/repositories/IUserRepository";

@injectable()
export class UserController {
    constructor(
        @inject(TOKENS.CreateUser) private createUserUseCase: CreateUser,
        @inject(TOKENS.UpdateUser) private updateUserUseCase: UpdateUser,
        @inject(TOKENS.ListUserGyms) private listUserGymsUseCase: ListUserGyms,
        @inject(TOKENS.UserRepository) private userRepo: IUserRepository
    ) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.createUserUseCase.execute({
                name: req.body.name,
                email: req.body.email,
                dateOfBirth: new Date(req.body.dateOfBirth),
                fitnessGoal: req.body.fitnessGoal
            });

            return res.status(201).json(user);
        } catch (err: any) {
            next(err);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userRepo.findAll();
            return res.json(users);
        } catch (err: any) {
            next(err);
        }
    }

    async listGyms(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const gyms = await this.listUserGymsUseCase.execute(userId);
            return res.json(gyms);
        } catch (err: any) {
            next(err);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await this.userRepo.findById(id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.json(user);
        } catch (err: any) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, email, dateOfBirth, fitnessGoal } = req.body;

            const updated = await this.updateUserUseCase.execute(id, {
                name,
                email,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
                fitnessGoal
            });

            return res.json(updated);
        } catch (err: any) {
            next(err);
        }
    }
}
