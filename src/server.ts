import express, { Request, Response } from "express";
import cors from "cors";

import userRoutes from "./interface/http/routes/user.routes";
import gymRoutes from "./interface/http/routes/gym.routes";
import membershipRoutes from "./interface/http/routes/membership.routes";
import { setupSwagger } from "./swagger";

import { errorHandler } from "./interface/http/middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

// Health check (FIXED TYPES)
app.get("/", (req: Request, res: Response) => {
    return res.json({ status: "API is running" });
});

// Swagger docs
setupSwagger(app);

// Routes
app.use("/users", userRoutes);
app.use("/gyms", gymRoutes);
app.use("/memberships", membershipRoutes);

// Global error handler
app.use(errorHandler);

// Listen
const PORT = process.env.PORT || 3000;
app.set("trust proxy", 1);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
