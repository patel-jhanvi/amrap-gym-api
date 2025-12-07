
import { Gym } from "../../domain/entities/Gym";
export interface IGymRepository {
    create(gym: Gym): Promise<Gym>;
    findById(id: string): Promise<Gym | null>;
    findAll(): Promise<Gym[]>;
    update(gym: Gym): Promise<Gym>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Gym | null>;
}
