import express from "express";
import authorsRouter from "./authors/index.js";
import postsRouter from "./posts/index.js";
import listEndpoints from "express-list-endpoints";
import { errorHandler } from "./errorHandlers.js";
import cors from "cors";
import { join } from "path";
import { getCurrentFolderPath } from "./lib/fs-tools.js";

const server = express();
const port = 3001;

const publicDirPath = join(getCurrentFolderPath(import.meta.url), "../public");
server.use(express.static(publicDirPath));
server.use(express.json());
server.use(cors());

server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);

server.use(errorHandler);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("server is listening on port ", port);
});
