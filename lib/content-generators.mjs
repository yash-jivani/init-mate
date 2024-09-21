import { NEXT_JS } from "../constants/constants.mjs";
import { capitalize } from "./helpers.mjs";

export const generateContextFileContent = (useTS) => {
  const stateType = useTS
    ? `export interface StateType {\n  value: number;\n}\n`
    : "";

  const contextType = useTS
    ? `export interface ContextType {\n  state: StateType;\n  setState: React.Dispatch<React.SetStateAction<StateType>>;\n}\n`
    : "";

  const initialState = useTS
    ? `const initialState: StateType = {\n  value: 0,\n};\n`
    : `const initialState = {\n  value: 0,\n};\n`;

  const contextDeclaration = useTS
    ? `export const AppContext = createContext<ContextType | undefined>(undefined);\n`
    : `export const AppContext = createContext(null);\n`;

  return `
import React, { createContext, useState${
    useTS ? ", ReactNode" : ""
  } } from 'react';

${stateType}  
${contextType}

${initialState}

${contextDeclaration} 

export const AppContextProvider = ({ children }${
    useTS ? ": { children: ReactNode }" : ""
  }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
`.trim();
};

export const generateUseContextFileContent = (useTS) => {
  const errorThrow = `throw new Error('useAppContext must be used within an AppContextProvider');`;

  return `
import { useContext } from 'react';
import { AppContext } from './AppContext';

${useTS ? `import { ContextType } from './AppContext';` : ""}

// Custom hook for consuming the context
const useAppContext = () => {
  const context${
    useTS ? ": ContextType | undefined" : ""
  } = useContext(AppContext);
  
  if (!context) {
    ${errorThrow}
  }

  return context;
};

export default useAppContext;
`.trim();
};

export const generatePageContent = (page, useTS, framework) => {
  const importStatement =
    framework === NEXT_JS ? "" : `import React from 'react';\n`;
  const componentCode = `
${importStatement}
const ${capitalize(page)}Page${useTS ? ": React.FC" : ""} = () => {
  return (
    <div>
      <h1>${capitalize(page)} Page</h1>
    </div>
  );
};

export default ${capitalize(page)}Page;
`;

  return componentCode.trim();
};

export const generateComponentContent = (componentName, useTS) => {
  const importStatement = `import React from 'react';\n`;
  const componentCode = `
${importStatement}
const ${componentName}${useTS ? ": React.FC" : ""} = () => {
  return (
    <div>
      <p>This is the ${componentName} component.</p>
    </div>
  );
};

export default ${componentName};
`;

  return componentCode.trim();
};

export const generateCustomHookContent = (useTS) => {
  const hookCode = `
import { useState, useEffect } from 'react';

const useCustomHook${useTS ? "<T>" : ""} = () => {
  const [state, setState] = useState${useTS ? "<T | null>" : ""}(null);

  useEffect(() => {
    // Hook logic here
  }, []);

  return { state, setState };
};

export default useCustomHook;
`;

  return hookCode.trim();
};

export const generateAPIServiceContent = (useTS) => {
  const axiosImport = `import axios from 'axios';\n`;
  const serviceCode = `
${axiosImport}
const API_URL = 'https://api.example.com';

export const fetchData${
    useTS ? " = async (): Promise<any>" : " = async ()"
  } => {
  try {
    const response = await axios.get(\`\${API_URL}/data\`);
    return response.data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};
`;

  return serviceCode.trim();
};

export const generateGlobalStylesContent = () => {
  return `/* Global styles */`;
};

export const generateHelperContent = (useTS) => {
  const helperCode = `
export const formatDate${useTS ? " = (date: Date): string" : " = (date)"} => {
  // Format date logic
  return date.toISOString();
};
`;

  return helperCode.trim();
};

export const generateTypesContent = () => {
  return `
export interface ExampleType {
  id: number;
  name: string;
  // Add more fields as needed
}
`.trim();
};

export const generateEnvFileContent = () => {
  return `
# Environment variables
API_URL=http://localhost:3000/api
AUTH_SECRET=your-secret-key
`.trim();
};

export const generatePrettierIgnoreContent = () => {
  return `
# Ignore artifacts:
build
dist
node_modules

# Ignore static assets:
public
static

# Ignore configuration and environment files:
.env
*.config.js
*.config.cjs
*.config.mjs

# Ignore lock files:
package-lock.json
yarn.lock

# Ignore compiled files and type declarations:
*.min.js
*.min.css
*.d.ts

# Ignore coverage reports:
coverage
`.trim();
};

export const getStoreContent = () => {
  return `
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slices/index';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
  `.trim();
};

export const getRootReducerContent = () => {
  return `
import { combineReducers } from '@reduxjs/toolkit';
import exampleSlice from '../slices/exampleSlice';

const rootReducer = combineReducers({
  example: exampleSlice,
});

export default rootReducer;
`.trim();
};

export const getSliceContent = (useTS) => {
  return useTS
    ? `
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
value: number;
}

const initialState: ExampleState = {
value: 0,
};

const exampleSlice = createSlice({
name: 'example',
initialState,
reducers: {
  increment: (state: ExampleState) => {
    state.value += 1;
  },
  decrement: (state: ExampleState) => {
    state.value -= 1;
  },
  // Add more reducers as needed
},
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
`
    : `
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: 0,
};

const exampleSlice = createSlice({
name: 'example',
initialState,
reducers: {
  increment: (state) => {
    state.value += 1;
  },
  decrement: (state) => {
    state.value -= 1;
  },
  // Add more reducers as needed
},
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
`;
};
