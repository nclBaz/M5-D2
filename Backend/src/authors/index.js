import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { authorsValidator } from "./validation.js";
import { validationResult } from "express-validator";
import { getAuthors, writeAuthors } from "../lib/fs-tools.js";

const authorsRouter = express.Router();

authorsRouter.post("/", authorsValidator, async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    const authors = await getAuthors();

    if (validationErrors.isEmpty()) {
      const newAuthor = {
        ...req.body,
        _id: uniqid(),
        avatar: "https://picsum.photos/50/50",
      };
      authors.push(newAuthor);
      console.log(authors);

      await writeAuthors(authors);
      res.status(201).send(newAuthor._id);
    } else {
      next(createError(400, { errorList: validationErrors }));
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    if (authors.length > 0) {
      res.send(authors);
    } else {
      next(createError(404, `No author found!`));
    }
  } catch (error) {
    next(error);
  }
});

authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const authors = await getAuthors();
    const target = authors.find((elem) => elem._id === id);

    if (target) {
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

authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const authors = await getAuthors();
    let remainings = authors.filter((elem) => elem._id !== req.params.id);
    const newTarget = {
      ...req.body,
      _id: req.params.id,
      avatar: "https://picsum.photos/50/50",
    };
    remainings.push(newTarget);
    await writeAuthors(remainings);
    res.status(201).send(newTarget);
  } catch (error) {
    next(error);
  }
});

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const authors = await getAuthors();

    const target = authors.filter((elem) => elem._id === req.params.id);

    if (target.length === 0 || authors.length === 0) {
      next(
        createError(
          404,
          `Author with the id of ${req.params.id} does not exist!`
        )
      );
    } else {
      let remainings = authors.filter((elem) => elem._id !== req.params.id);
      await writeAuthors(remainings);
      res.status(200).send("deleted successfully");
    }
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
