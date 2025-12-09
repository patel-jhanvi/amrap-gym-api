import "reflect-metadata";
import { container } from "tsyringe";

// Reset container before each test to ensure isolation
beforeEach(() => {
    container.clearInstances();
});
