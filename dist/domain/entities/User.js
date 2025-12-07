"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, dateOfBirth, fitnessGoal, joinDate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.fitnessGoal = fitnessGoal;
        this.joinDate = joinDate;
    }
}
exports.User = User;
