import express from "express";
import cors from "cors";
import userRoutes from "@interface/http/routes/user.routes";
import gymRoutes from "@interface/http/routes/gym.routes";
import membershipRoutes from "@interface/http/routes/membership.routes";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/gyms", gymRoutes);
app.use("/memberships", membershipRoutes);

app.get("/", (req, res) => res.json({ status: "API is running" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
