
export class Membership {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly gymId: string,
        public readonly joinDate: Date
    ) { }
}