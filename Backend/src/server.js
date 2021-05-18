import express from "express";
import authorsRouter from "./authors/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;
server.use(express.json());
server.use("/authors", authorsRouter);

console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("server is listening on port ", port);
});
