import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
