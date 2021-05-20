import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

export const getAuthors = async () =>
  await readJSON(join(dataFolderPath, "authors.json"));

export const getPosts = async () =>
  await readJSON(join(dataFolderPath, "posts.json"));
