"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gym = void 0;
class Gym {
    constructor(id, name, type, // "commercial" | "home" | "apartment" 
    location, maxCapacity) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.location = location;
        this.maxCapacity = maxCapacity;
    }
}
exports.Gym = Gym;
