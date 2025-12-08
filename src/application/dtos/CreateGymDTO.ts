export interface CreateGymDTO {
    name: string;
    type: string;
    location: string | null;
    maxCapacity: number | null;
}
