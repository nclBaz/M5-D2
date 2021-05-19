import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const postsRouter = express.Router();
const indexFilePath = fileURLToPath(import.meta.url);
const folderPath = dirname(indexFilePath);
const jsonFilePath = join(folderPath, "posts.json");
const fileContent = JSON.parse(fs.readFileSync(jsonFilePath).toString());

postsRouter.post("/", (req, res) => {
  const newPost = {
    ...req.body,
    id: uniqid(),
    cover: "https://picsum.photos/seed/n/600/400",
    readTime: { value: 2, unit: "minute" },
    author: {
      name: "AUTHOR AVATAR NAME",
      avatar: "https://picsum.photos/seed/b/600/400",
    },
    createdAt: new Date(),
  };
  fileContent.push(newPost);

  fs.writeFileSync(jsonFilePath, JSON.stringify(fileContent));
  res.status(201).send();
});

postsRouter.get("/", (req, res) => {
  res.send(fileContent);
});

export default postsRouter;
