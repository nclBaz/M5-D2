import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

export const getAuthors = async () =>
  await readJSON(join(dataFolderPath, "authors.json"));

export const getPosts = async () =>
  await readJSON(join(dataFolderPath, "posts.json"));

export const writeAuthors = async (content) =>
  await writeJSON(join(dataFolderPath, "authors.json"), content);

export const writePosts = async (content) =>
  await writeJSON(join(dataFolderPath, "posts.json"), content);

export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));

const authorsAvatarsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/authorsAvatars"
);
export const writeAuthorsAvatar = async (file, fileName) =>
  await writeFile(join(authorsAvatarsFolderPath, fileName), file);
