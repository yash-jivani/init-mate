import path from "path";

import {
  getRootReducerContent,
  getSliceContent,
  getStoreContent,
} from "../../lib/content-generators.mjs";

export const getReduxToolKitFolders = () => {
  return ["src/redux/store", "src/redux/slices"];
};

export const createReduxFiles = (basePath, useTS) => {
  const ext = useTS ? "ts" : "js";

  createFile(
    path.join(basePath, `src/redux/store/index.${ext}`),
    getStoreContent()
  );

  createFile(
    path.join(basePath, `src/redux/slices/index.${ext}`),
    getRootReducerContent()
  );

  createFile(
    path.join(basePath, `src/redux/slices/exampleSlice.${ext}`),
    getSliceContent(useTS)
  );
};
