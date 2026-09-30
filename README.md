# React 19 + TypeScript + JSON Server + Tailwind CSS + Vite

Task Manager sample app using React 19.

## Setup

# 1. Create a modern Vite application with the React+TypeScript template
npm create vite@latest my-react-tutorial -- --template react-ts
cd my-react-tutorial

# 2. Upgrade to React 19 and React DOM 19
npm install react@rc react-dom@rc @types/react@rc @types/react-dom@rc

# 3. Install the new Tailwind v4 core framework and official Vite integration plugin
npm install tailwindcss @tailwindcss/vite

# 4. Add the following to vite.config.ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Registers Tailwind CSS natively into the compiler build matrix
  ],
})

# 5. Run development server and JSON server concurrently
npm install -D concurrently

# 6. Add the following scripts to package.json
{
  "name": "my-react-tutorial",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "backend": "npx json-server --watch db.json --port 3001",
    "start": "concurrently \"npm run dev\" \"npm run backend\"",
    "build": "tsc && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}

npm run start

## Install a Lightweight Error Boundary Tool

//To avoid writing verbose old-school class component boilerplate for the Error Boundary, 

npm install react-error-boundary

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
