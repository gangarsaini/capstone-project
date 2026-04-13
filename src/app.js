import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import routertwo from './routes/videoRoutes.js';
import routerThree from "./routes/channelRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";



const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
app.use("/api/auth", router);
app.use("/api/videos", routertwo);
app.use("/api/channels", routerThree);
app.use("/api/comments", commentRoutes);
// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;