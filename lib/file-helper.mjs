import path from "path";
import fs from "fs-extra";

import {
  generateAPIServiceContent,
  generateComponentContent,
  generateCustomHookContent,
  generateGlobalStylesContent,
  generateHelperContent,
  generatePageContent,
  generateTypesContent,
} from "./content-generators.mjs";
import { capitalize } from "./helpers.mjs";

import {
  ABOUT,
  AUTH,
  DASHBOARD,
  NEXT_JS,
  REACT_JS,
} from "../constants/constants.mjs";
import { createStateManagementFiles } from "../state-managers/index.mjs";
import { addPrettierConfigFile } from "../code-formatter/prettier/prettier-config.mjs";
import { addEnvFile } from "../others/env/env-config.mjs";

export const createFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Error creating file ${filePath}:`, error);
  }
};

export const createFilesAndAddContent = (
  basePath,
  framework,
  useTS,
  stateManagement
) => {
  const ext = useTS ? "ts" : "js";
  const jsxExt = useTS ? "tsx" : "jsx";
  const pages = [DASHBOARD, ABOUT, AUTH];

  // 1. Create pages and components
  pages.forEach((page) => {
    let pagePath;

    if (framework === NEXT_JS) {
      pagePath = path.join(basePath, `src/app/${page}/page.${jsxExt}`);
    } else if (framework === REACT_JS) {
      pagePath = path.join(basePath, `src/pages/${page}/index.${jsxExt}`);
    } else {
      console.log("Invalid framework choice. Exiting.");
      return;
    }
    createFile(pagePath, generatePageContent(page));

    const componentPath = path.join(
      basePath,
      `src/components/${page}/Demo${capitalize(page)}Component.${jsxExt}`
    );
    createFile(componentPath, generateComponentContent(page));

    const cssFolder = path.join(basePath, `src/styles/${page}`);
    const cssFilePath = path.join(cssFolder, `${page}.css`);
    const responsiveCssFilePath = path.join(
      cssFolder,
      `${page}-responsive.css`
    );

    createFile(cssFilePath, `/* Styles for ${page} page */`);
    createFile(
      responsiveCssFilePath,
      `/* Responsive styles for ${page} page */`
    );
  });

  // 2. Create hooks, services, utils, and global style
  createFile(
    path.join(basePath, `src/hooks/useCustomHook.${jsxExt}`),
    generateCustomHookContent()
  );
  createFile(
    path.join(basePath, `src/services/apiService.${ext}`),
    generateAPIServiceContent()
  );
  createFile(
    path.join(basePath, `src/styles/global.css`),
    generateGlobalStylesContent()
  );
  createFile(
    path.join(basePath, `src/utils/helper.${ext}`),
    generateHelperContent(useTS)
  );

  // 3. Create TypeScript-specific files
  if (useTS) {
    createFile(
      path.join(basePath, "src/types/index.ts"),
      generateTypesContent()
    );
  }

  // 4. Create state management files
  createStateManagementFiles(basePath, stateManagement, useTS);

  // 5. Add prettier config
  addPrettierConfigFile(basePath);

  // 6. Add .env file
  addEnvFile(basePath);
};
