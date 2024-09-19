import { CONTEXT, REDUX_TOOLKIT } from "../constants/constants.mjs";
import { createContextFiles } from "./context/context-setup.mjs";
import { createReduxFiles } from "./redux-toolkit/redux-setup.mjs";

export const createStateManagementFiles = (
  basePath,
  stateManagement,
  useTS
) => {
  if (stateManagement === REDUX_TOOLKIT) {
    createReduxFiles(basePath, useTS);
  } else if (stateManagement === CONTEXT) {
    createContextFiles(basePath, useTS);
  }
};
