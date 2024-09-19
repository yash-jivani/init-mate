import path from "path";
import fs from "fs-extra";

import { generateEnvFileContent } from "../../lib/content-generators.mjs";

export const addEnvFile = (basePath) => {
  const envFilePath = path.join(basePath, ".env");

  try {
    if (!fs.existsSync(envFilePath)) {
      createFile(envFilePath, generateEnvFileContent());
      console.log(".env file created successfully.");
    } else {
      console.log(".env file already exists, skipping creation.");
    }
  } catch (error) {
    console.error(`Error creating .env file: ${error.message}`);
  }
};
