import path from "path";

import {
  generateContextFileContent,
  generateUseContextFileContent,
} from "../../lib/content-generators.mjs";

export const getContextFolders = () => {
  return ["src/context"];
};

export const createContextFiles = (basePath, useTS) => {
  const jsxExt = useTS ? "tsx" : "jsx";

  const contextFilePath = path.join(
    basePath,
    `src/context/AppContext.${jsxExt}`
  );
  const useContextFilePath = path.join(
    basePath,
    `src/context/useAppContext.${jsxExt}`
  );

  createFile(contextFilePath, generateContextFileContent(useTS));
  createFile(useContextFilePath, generateUseContextFileContent(useTS));
};
