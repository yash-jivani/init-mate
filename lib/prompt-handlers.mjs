import { FRAMEWORKS, STATE_MANAGERS } from "../constants/constants.mjs";
import {
  getDependencies,
  installDependencies,
} from "./dependency-installer.mjs";

import { createFolderStructureForFramework } from "./folder-helper.mjs";

import { isTypeScriptProject } from "./helpers.mjs";

export const promptUser = async () => {
  const basePath = process.cwd();
  const useTS = isTypeScriptProject(basePath);

  console.log(chalk.cyan.bold("\n🚀 Welcome to the init-mate! 🚀\n"));

  try {
    const { framework } = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: chalk.green("Choose a framework:"),
        choices: FRAMEWORKS,
      },
    ]);

    const { stateManagement } = await inquirer.prompt([
      {
        type: "list",
        name: "stateManagement",
        message: chalk.green("Choose a state management option:"),
        choices: STATE_MANAGERS,
      },
    ]);

    const { depChoice } = await inquirer.prompt([
      {
        type: "list",
        name: "depChoice",
        message: chalk.green("How would you like to install dependencies?"),
        choices: [
          "Install all common dependencies",
          "Choose specific dependencies",
          "Add custom dependencies",
          "Skip dependency installation",
        ],
      },
    ]);

    console.log(
      chalk.yellow(
        `\n🔧 Setting up your ${framework.toUpperCase()} project with ${stateManagement.toUpperCase()}...\n`
      )
    );

    const spinner = ora("📁 Creating folder structure...").start();

    try {
      createFolderStructureForFramework(
        framework,
        stateManagement,
        basePath,
        useTS
      );
      spinner.succeed("✅ Folder structure created!");

      if (depChoice === "Install all common dependencies") {
        const deps = getDependencies(framework, stateManagement);
        installDependencies(deps);
      } else if (depChoice === "Choose specific dependencies") {
        const deps = getDependencies(framework, stateManagement);
        const { selectedDeps } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "selectedDeps",
            message: chalk.green(
              "📦 Select the dependencies you want to install:"
            ),
            choices: deps.map((dep) => ({
              name: dep,
              value: dep,
            })),
            pageSize: 10,
          },
        ]);
        if (selectedDeps.length > 0) {
          installDependencies(selectedDeps);
        } else {
          console.log(chalk.blue("\nNo dependencies selected.\n"));
        }
      } else if (depChoice === "Add custom dependencies") {
        const { customDeps } = await inquirer.prompt([
          {
            type: "input",
            name: "customDeps",
            message: "📝 Enter custom dependencies (comma separated):",
            validate: (input) =>
              input ? true : "Please enter at least one dependency.",
          },
        ]);
        const customDepsArray = customDeps.split(",").map((dep) => dep.trim());
        installDependencies(customDepsArray);
      } else {
        console.log(chalk.blue("\nSkipping dependency installation.\n"));
      }
    } catch (error) {
      spinner.fail("Something went wrong!");
    }

    console.log(chalk.green.bold("\n🎉 Project setup complete! 🎉\n"));
  } catch (error) {
    if (error.message.includes("force closed")) {
      console.log(chalk.red("\nPrompt was forcefully closed by the user."));
    } else if (error.isTtyError) {
      console.error(
        chalk.red(
          "Error: Prompt could not be rendered in the current environment."
        )
      );
    } else {
      console.error(chalk.red("An unexpected error occurred:"), error);
    }
    process.exit(1);
  }
};
