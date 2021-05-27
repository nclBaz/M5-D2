import express from "express";
import authorsRouter from "./authors/index.js";
import postsRouter from "./posts/index.js";
import listEndpoints from "express-list-endpoints";
import { errorHandler } from "./errorHandlers.js";
import cors from "cors";
import { join } from "path";
import { getCurrentFolderPath } from "./lib/fs-tools.js";

const server = express();
const port = process.env.PORT || 3001;
const publicDirPath = join(getCurrentFolderPath(import.meta.url), "../public");
const whiteList = [
  process.env.FRONTEND_DEV_URL,
  process.env.FRONTEND_CLOUD_URL,
];
const corsOptions = {
  origin: function (origin, next) {
    console.log("ORIGIN ", origin);
    if (whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("CORS TROUBLES!!!!!"));
    }
  },
};
// Middlewares
server.use(express.static(publicDirPath));
server.use(express.json());
server.use(cors(corsOptions));

// Routes
server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);

// Error Handler
server.use(errorHandler);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("server is listening on port ", port);
});
