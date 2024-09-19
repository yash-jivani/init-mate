import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export const isTypeScriptProject = (basePath) => {
  const tsConfigPath = path.join(basePath, "tsconfig.json");
  if (fs.existsSync(tsConfigPath)) {
    try {
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf-8"));
      if (tsConfig) {
        return true;
      }
    } catch (error) {
      console.warn(chalk.yellow("Warning: tsconfig.json is invalid."));
    }
  }

  const hasTypeScriptFiles = fs
    .readdirSync(basePath)
    .some((file) => file.endsWith(".ts") || file.endsWith(".tsx"));

  return hasTypeScriptFiles;
};

export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
