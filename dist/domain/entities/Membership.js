"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
class Membership {
    constructor(id, userId, gymId, joinDate) {
        this.id = id;
        this.userId = userId;
        this.gymId = gymId;
        this.joinDate = joinDate;
    }
}
exports.Membership = Membership;
