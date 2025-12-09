import "reflect-metadata";
import { container } from "tsyringe";

import { TOKENS } from "./tokens";

// Repositories
import { PrismaUserRepository } from "../database/PrismaUserRepository";
import { PrismaGymRepository } from "../database/PrismaGymRepository";
import { PrismaMembershipRepository } from "../database/PrismaMembershipRepository";

// Use Cases
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { ListUserGyms } from "../../application/use-cases/ListUserGyms";
import { CreateGym } from "../../application/use-cases/CreateGym";
import { ListGymUsers } from "../../application/use-cases/ListGymUsers";
import { ListAvailableGyms } from "../../application/use-cases/ListAvailableGyms";
import { AddMembership } from "../../application/use-cases/AddMembership";
import { RemoveMembership } from "../../application/use-cases/RemoveMembership";

// Controllers
import { UserController } from "../../interface/http/controllers/UserController";
import { GymController } from "../../interface/http/controllers/GymController";
import { MembershipController } from "../../interface/http/controllers/MembershipController";

// Register Repositories as Singletons
container.registerSingleton(TOKENS.UserRepository, PrismaUserRepository);
container.registerSingleton(TOKENS.GymRepository, PrismaGymRepository);
container.registerSingleton(TOKENS.MembershipRepository, PrismaMembershipRepository);

// Register Use Cases
container.register(TOKENS.CreateUser, { useClass: CreateUser });
container.register(TOKENS.UpdateUser, { useClass: UpdateUser });
container.register(TOKENS.ListUserGyms, { useClass: ListUserGyms });
container.register(TOKENS.CreateGym, { useClass: CreateGym });
container.register(TOKENS.ListGymUsers, { useClass: ListGymUsers });
container.register(TOKENS.ListAvailableGyms, { useClass: ListAvailableGyms });
container.register(TOKENS.AddMembership, { useClass: AddMembership });
container.register(TOKENS.RemoveMembership, { useClass: RemoveMembership });

// Register Controllers
container.register(UserController, { useClass: UserController });
container.register(GymController, { useClass: GymController });
container.register(MembershipController, { useClass: MembershipController });

export { container };
