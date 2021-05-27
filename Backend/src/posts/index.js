import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { postsValidator } from "./validation.js";
import { validationResult } from "express-validator";
import { getPosts, writePosts } from "../lib/fs-tools.js";

const postsRouter = express.Router();

postsRouter.post("/", postsValidator, async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    const posts = await getPosts();

    if (validationErrors.isEmpty()) {
      const newPost = {
        ...req.body,
        _id: uniqid(),
        cover: "https://picsum.photos/600/400",
        readTime: { value: 2, unit: "minute" },
        author: {
          name: "AUTHOR AVATAR NAME",
          avatar: "https://picsum.photos/seed/b/600/400",
        },
        createdAt: new Date(),
      };
      posts.push(newPost);

      await writePosts(posts);
      res.status(201).send({ _id: newPost._id });
    } else {
      next(createError(400, { errorList: validationErrors }));
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getPosts();
    if (posts.length > 0) {
      res.send(posts);
    } else {
      next(createError(404, `No post found!`));
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const posts = await getPosts();
    const target = posts.find((elem) => elem._id === req.params.id);

    if (target) {
      res.send(target);
    } else {
      next(
        createError(404, `the post with id of ${req.params.id} didn't found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:id", async (req, res, next) => {
  try {
    const posts = await getPosts();
    let remainings = posts.filter((elem) => elem._id !== req.params.id);
    const target = posts.find((elem) => elem._id === req.params._id);

    const newTarget = {
      ...req.body,
      _id: req.params.id,
      cover: "https://picsum.photos/600/400",
      readTime: { value: 2, unit: "minute" },
      author: {
        name: "AUTHOR AVATAR NAME",
        avatar: "https://picsum.photos/seed/b/600/400",
      },
      createdAt: target.createdAt,
    };
    console.log(newTarget);
    remainings.push(newTarget);
    await writePosts(remainings);
    res.status(201).send(newTarget);
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:id", async (req, res, next) => {
  try {
    const posts = await getPosts();

    const target = posts.filter((elem) => elem._id === req.params.id);

    if (target.length === 0 || posts.length === 0) {
      next(
        createError(404, `post with the id of ${req.params.id} does not exist!`)
      );
    } else {
      let remainings = posts.filter((elem) => elem._id !== req.params.id);
      await writePosts(remainings);
      res.status(200).send("deleted successfully");
    }
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
