import path from "path";
import fs from "fs-extra";

import { PRETTIER_CONFIG } from "../../constants/constants.mjs";
import { generatePrettierIgnoreContent } from "../../lib/content-generators.mjs";

export const addPrettierConfigFile = (basePath) => {
  try {
    fs.writeFileSync(
      path.join(basePath, ".prettierrc"),
      JSON.stringify(PRETTIER_CONFIG, null, 2)
    );

    fs.writeFileSync(
      path.join(basePath, ".prettierignore"),
      generatePrettierIgnoreContent()
    );
  } catch (error) {
    console.error("Error creating Prettier config:", error);
  }
};
