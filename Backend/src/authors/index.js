import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();
const indexFilePath = fileURLToPath(import.meta.url);
const folderPath = dirname(indexFilePath);
const jsonFilePath = join(folderPath, "authors.json");
const fileContent = JSON.parse(fs.readFileSync(jsonFilePath).toString());

authorsRouter.post("/", (req, res) => {
  const newAuthor = { ...req.body, id: uniqid() };
  fileContent.push(newAuthor);

  fs.writeFileSync(jsonFilePath, JSON.stringify(fileContent));
  res.status(201).send();
});

authorsRouter.get("/", (req, res) => {
  res.send(fileContent);
});
authorsRouter.get("/:id", (req, res) => {});
authorsRouter.put("/:id", (req, res) => {});
authorsRouter.delete("/:id", (req, res) => {});

export default authorsRouter;
