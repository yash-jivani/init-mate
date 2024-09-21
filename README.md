
# Init Mate


**Init Mate** is a powerful CLI tool that streamlines the project initialization process for React or Next.js applications. It simplifies repetitive setup tasks like creating common folder structures, generating boilerplate code, installing necessary libraries, and configuring state management. With Init Mate, developers can quickly set up their projects with preferred frameworks, state management options, and dependencies—all through an intuitive CLI interface. This allows developers to skip the manual setup and dive straight into building their applications.

## Features
- **Quick Setup**: Easily initialize your React or Next.js projects with just a few commands.
- **TypeScript Support**: Automatically detects if you're using TypeScript and sets up the project accordingly.
- **State Management Options**: Choose between Redux Toolkit and Context API for your project's state management needs.
- **Customizable Dependency Installation**: Select common, specific, or custom dependencies based on your project requirements.


## Installation

To use Init Mate, you have two options for installation:

### Option 1: Use with `npx` (Recommended)

You can run Init Mate directly without installing it globally by using the following command:

```bash
npx init-mate
```

This command will run the CLI tool immediately and guide you through the setup process.

### Option 2: Install Globally

Alternatively, you can install Init Mate globally on your system to use it as a standalone command:

```bash
npm install -g init-mate
```

After installing globally, you can run the tool with:

```bash
init-mate
```


## Usage

After running **Init Mate**, your project will be set up with a clear, organized structure. Here’s what you can expect:

### Main Structure

- **`src/`**: The main source directory containing:
  - **`components/`**: Organized subfolders for common UI components, such as:
    - **`common/`**
    - **`dashboard/`**
    - **`about/`**
    - **`auth/`**
    Each folder includes demo files and boilerplate code.
  - **`context/`**: Files for managing state (e.g., Context API or Redux Toolkit), pre-configured with example setups.
  - **`hooks/`**: Custom hooks for reusable logic, already filled with examples.
  - **`services/`**: Starter code for API calls and other external services.
  - **`styles/`**: Application styles, with demo files included for easy customization.
  - **`utils/`**: Utility functions with basic examples to help streamline your development.

### Framework-specific Adjustments

The generated folder structure adapts to the selected framework:
- **React**: A `pages/` directory is created for managing your pages.
- **Next.js**: The setup adheres to Next.js' app router standards, with folders like `app/` for seamless routing and layout management, including files such as:
  - **`page.tsx`**
  - **`layout.tsx`**

### Additional Configurations

- **Prettier**: Configuration files for **Prettier** will be added, ensuring consistent code formatting throughout your project.


This setup ensures your project is structured in a way that’s easy to navigate, making it easier to maintain no matter the complexity.



## Options
During the setup process, you'll be prompted to make several choices:

1. **Choose a Framework**: Select either React or Next.js as your project framework.
2. **Select a State Management Option**: Choose between Redux Toolkit or Context API for managing application state.
3. **Install Dependencies**: Decide how you would like to install dependencies:
   - Install all common dependencies
   - Choose specific dependencies
   - Add custom dependencies
   - Skip dependency installation

## Contributing

We welcome contributions from the community! If you'd like to help improve Init Mate, please read our [CONTRIBUTING.md](https://github.com/yash-jivani/init-mate/blob/master/CONTRIBUTING.md) for guidelines on how to get involved.

## Roadmap
Here’s what we have planned for future versions of Init Mate:
- Support for additional frameworks (e.g., Vue, Angular).
- Integration with other state management libraries.
- Support for flags to skip interactive questions and directly generate the folder structure with predefined options.
- Enhanced customization options for project setups.
- Improved error handling and user feedback.

## Feedback
Your feedback is essential to us! Whether you have suggestions for improvements, encountered a bug, or simply want to share your experience, please let us know.
- **Submit an Issue**: If you run into problems or have feature requests, please open an issue in our [GitHub repository](https://github.com/yash-jivani/init-mate/issues).

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/yash-jivani/init-mate/blob/master/LICENSE) file for more details.
