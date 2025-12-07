export class Gym {
    constructor(
        public readonly id: string,
        public name: string,
        public type: string,           // "commercial" | "home" | "apartment" (we’ll validate later)
        public location: string | null,
        public maxCapacity: number | null
    ) { }
}