import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import createError from "http-errors";
import { authorsValidator } from "./validation.js";
import { validationResult } from "express-validator";

const authorsRouter = express.Router();
const jsonFilePath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
const fileContent = JSON.parse(fs.readFileSync(jsonFilePath).toString());

const writeFile = (content) =>
  fs.writeFileSync(jsonFilePath, JSON.stringify(content));

authorsRouter.post("/", authorsValidator, (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    console.log("validation: ", validationErrors);

    if (!validationErrors.isEmpty()) {
      next(createError(400, { errorList: validationErrors }));
    } else {
      const newAuthor = {
        ...req.body,
        id: uniqid(),
        avatar: "https://picsum.photos/50/50",
      };
      fileContent.push(newAuthor);
      writeFile(fileContent);
      res.status(201).send(newAuthor);
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/", (req, res, next) => {
  try {
    if (fileContent.length > 0) {
      res.send(fileContent);
    } else {
      next(createError(404, `No author found!`));
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const target = fileContent.find((elem) => elem.id === id);

    if (targer) {
      res.send(target);
    } else {
      next(
        createError(404, `the author with id of ${req.params.id} didn't found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.put("/:id", (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

authorsRouter.delete("/:id", (req, res) => {
  try {
    const target = fileContent.filter((elem) => elem.id === req.params.id);

    if (targer.length === 0) {
      next(
        createError(
          404,
          `Author with the id of ${req.params.id} does not exist!`
        )
      );
    } else {
      let remainings = fileContent.filter((elem) => elem.id !== req.params.id);
      writeFile(remainings);
      res.status(200).send("deleted");
    }
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
