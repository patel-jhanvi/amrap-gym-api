import { Membership } from "@domain/entities/Membership";
export interface IMembershipRepository {
    create(membership: Membership): Promise<Membership>;
    deleteByUserAndGym(userId: string, gymId: string): Promise<void>;
    findUsersByGym(gymId: string): Promise<Membership[]>;
    findGymsByUser(userId: string): Promise<Membership[]>;
    findByUserAndGym(userId: string, gymId: string): Promise<Membership | null>; // if membership exist
    countByGym(gymId: string): Promise<number>; //capacity check
}