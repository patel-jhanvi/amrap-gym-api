// DI tokens for interface bindings
// Since TypeScript interfaces are erased at runtime, we need string tokens

export const TOKENS = {
    // Repositories
    UserRepository: Symbol.for("IUserRepository"),
    GymRepository: Symbol.for("IGymRepository"),
    MembershipRepository: Symbol.for("IMembershipRepository"),

    // Use Cases - User
    CreateUser: Symbol.for("CreateUser"),
    UpdateUser: Symbol.for("UpdateUser"),
    ListUserGyms: Symbol.for("ListUserGyms"),

    // Use Cases - Gym
    CreateGym: Symbol.for("CreateGym"),
    ListGymUsers: Symbol.for("ListGymUsers"),
    ListAvailableGyms: Symbol.for("ListAvailableGyms"),

    // Use Cases - Membership
    AddMembership: Symbol.for("AddMembership"),
    RemoveMembership: Symbol.for("RemoveMembership"),
};
