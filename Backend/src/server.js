import express from "express";
import authorsRouter from "./authors/index.js";
import postsRouter from "./posts/index.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

const server = express();
const port = 3001;
server.use(express.json());
server.use(cors());

server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("server is listening on port ", port);
});
