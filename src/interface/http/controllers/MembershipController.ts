import { injectable, inject } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { TOKENS } from "../../../infrastructure/di/tokens";

import { AddMembership } from "../../../application/use-cases/AddMembership";
import { RemoveMembership } from "../../../application/use-cases/RemoveMembership";

@injectable()
export class MembershipController {
    constructor(
        @inject(TOKENS.AddMembership) private addMembershipUseCase: AddMembership,
        @inject(TOKENS.RemoveMembership) private removeMembershipUseCase: RemoveMembership
    ) { }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, gymId } = req.body;
            const membership = await this.addMembershipUseCase.execute({ userId, gymId });
            return res.status(201).json(membership);
        } catch (err: any) {
            next(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, gymId } = req.body;
            await this.removeMembershipUseCase.execute(userId, gymId);
            return res.status(200).json({ message: "Membership removed" });
        } catch (err: any) {
            next(err);
        }
    }
}
