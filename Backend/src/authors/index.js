import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();
const jsonFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
const fileContent = JSON.parse(fs.readFileSync(jsonFilePath).toString());

const writeFile = (content) =>
  fs.writeFileSync(jsonFilePath, JSON.stringify(content));

authorsRouter.post("/", (req, res) => {
  const newAuthor = {
    ...req.body,
    id: uniqid(),
    avatar: "https://picsum.photos/50/50",
  };
  fileContent.push(newAuthor);

  writeFile(fileContent);
  res.status(201).send();
});

authorsRouter.get("/", (req, res) => {
  res.send(fileContent);
});
authorsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const target = fileContent.find((elem) => elem.id === id);
  res.send(target);
});
authorsRouter.put("/:id", (req, res) => {
  let remainings = fileContent.filter((elem) => elem.id !== req.params.id);
  const newTarget = {
    ...req.body,
    id: req.params.id,
    avatar: "https://picsum.photos/50/50",
  };
  remainings.push(newTarget);
  console.log(remainings);
  writeFile(remainings);
  res.status(201).send(newTarget);
});
authorsRouter.delete("/:id", (req, res) => {
  let remainings = fileContent.filter((elem) => elem.id !== req.params.id);
  writeFile(remainings);
  res.status(200).send("deleted");
});

export default authorsRouter;
