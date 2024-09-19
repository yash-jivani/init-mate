import chalk from "chalk";
import { execSync } from "child_process";
import ora from "ora";

import { COMMON_DEPENDENCIES } from "../constants/constants.mjs";

export const getDependencies = (framework, stateManagement) => {
  const frameworkSpecificDeps = getFrameworkSpecificDependencies(framework);
  const stateSpecificDeps = getStateSpecificDependencies(stateManagement);
  return [
    ...COMMON_DEPENDENCIES,
    ...stateSpecificDeps,
    ...frameworkSpecificDeps,
  ];
};

export const installDependencies = (deps) => {
  const spinner = ora("Installing dependencies...").start();

  try {
    console.log(`\n🚀 Installing the following dependencies:`);
    deps.forEach((dep) => {
      console.log(chalk.blue(`📦 ${dep}`));
    });
    execSync(`npm install ${deps.join(" ")} --save`, { stdio: "inherit" });
    spinner.succeed("✅ Dependencies installed successfully.");
  } catch (error) {
    spinner.fail("Error installing dependencies.");
    if (error.message.includes("force closed")) {
      console.log(chalk.red("\nPrompt was forcefully closed by the user."));
    } else if (error.signal === "SIGINT" || error.status === 3221225786) {
      console.log(chalk.red("\n❗ Installation was interrupted by the user."));
    } else {
      console.error(
        chalk.red("\n⚠ Error installing dependencies. Please try again.")
      );
    }
    process.exit(1);
  }
};

const getStateSpecificDependencies = (stateManagement) => {
  switch (stateManagement) {
    case REDUX_TOOLKIT:
      return [REDUXJS_TOOLKIT, REACT_REDUX];
    case CONTEXT:
      return [];
    default:
      return [];
  }
};

const getFrameworkSpecificDependencies = (framework) => {
  switch (framework) {
    case REACT_JS:
      return [REACT_ROUTER_DOM];
    case NEXT_JS:
      return [NEXT_AUTH];
    default:
      return [];
  }
};
