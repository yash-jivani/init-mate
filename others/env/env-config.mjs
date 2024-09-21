import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

import { generateEnvFileContent } from "../../lib/content-generators.mjs";
import { createFile } from "../../lib/file-helper.mjs";

export const addEnvFile = (basePath) => {
  const envFilePath = path.join(basePath, ".env");

  try {
    if (!fs.existsSync(envFilePath)) {
      createFile(envFilePath, generateEnvFileContent());
    } else {
      console.log(
        chalk.yellow("\n.env file already exists, skipping creation.")
      );
    }
  } catch (error) {
    console.error(chalk.red(`\nError creating .env file: ${error.message}`));
  }
};
