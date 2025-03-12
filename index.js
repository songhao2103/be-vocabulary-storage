import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
import route from "./src/routes/indexRouter.js";

const app = express();
const PORT = 2201;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fe-vocabulary-storage.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Nếu cần gửi cookie, session
  })
);

dbConnect();

route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
