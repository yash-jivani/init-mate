import path from "path";
import fs from "fs-extra";

import { createFilesAndAddContent } from "./file-helper.mjs";
import { getReactJsFolders } from "../frameworks/reactjs/reactjs-setup.mjs";
import { getNextJsFolders } from "../frameworks/nextjs/nextjs-setup.mjs";
import { getContextFolders } from "../state-managers/context/context-setup.mjs";
import { getReduxToolKitFolders } from "../state-managers/redux-toolkit/redux-setup.mjs";
import {
  CONTEXT,
  NEXT_JS,
  REACT_JS,
  REDUX_TOOLKIT,
} from "../constants/constants.mjs";

export const createFolderStructureForFramework = (
  framework,
  stateManagement,
  basePath,
  useTS
) => {
  // 1. get folder strucutre
  const folders = getFolderStructure(framework, stateManagement, useTS);

  // 2. create folders
  createFolderStructure(basePath, folders);

  // 3. add files and add content
  createFilesAndAddContent(basePath, framework, useTS, stateManagement);
};

export const getFolderStructure = (framework, stateManagement, useTS) => {
  switch (framework) {
    case REACT_JS:
      return getFolders(REACT_JS, stateManagement, useTS);
    case NEXT_JS:
      return getFolders(NEXT_JS, stateManagement, useTS);
    default:
      console.log("Invalid framework choice. Exiting.");
  }
};

export const createFolderStructure = (basePath, folders) => {
  folders.forEach((folder) => {
    const folderPath = path.join(basePath, folder);
    fs.ensureDirSync(folderPath);
  });
};

export const getFrameworkSpecificFolders = (framework) => {
  switch (framework) {
    case REACT_JS:
      return getReactJsFolders();
    case NEXT_JS:
      return getNextJsFolders();
    default:
      console.log("Invalid framework choice. Exiting.");
      return [];
  }
};

export const getStateSpecificFolders = (stateManagement) => {
  switch (stateManagement) {
    case REDUX_TOOLKIT:
      return getReduxToolKitFolders();
    case CONTEXT:
      return getContextFolders();
    default:
      console.log("Invalid state management choice. Exiting.");
      return [];
  }
};

export const getFolders = (framework, stateManagement, useTS) => {
  return [
    // COMMON FOLDERS
    "src/components/common",
    "src/components/dashboard",
    "src/components/about",
    "src/components/auth",

    "src/hooks",
    "src/services",
    "src/utils",

    "src/assets/images",
    "src/assets/fonts",
    "src/assets/icons",

    "src/styles/about",
    "src/styles/dashboard",
    "src/styles/auth",

    // FRAMEWORK SPECIFIC STRUCTURE
    ...getFrameworkSpecificFolders(framework),

    // STATE MANAGEMENT FOLDERS
    ...getStateSpecificFolders(stateManagement),

    // TYPESCRIPT FOLDERS
    useTS ? "src/types" : "",
  ].filter(Boolean);
};
