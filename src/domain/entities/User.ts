export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public dateOfBirth: Date,
        public fitnessGoal: string,
        public joinDate?: Date
    ) { }
}