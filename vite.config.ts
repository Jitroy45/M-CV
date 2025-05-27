import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/My-CV/', // Default base path for development
  };

  // IMPORTANT: Adjust base path for GitHub Pages deployment
  // It should be '/your-repository-name/'
  // For example, if your repo is https://github.com/username/my-cv,
  // then base should be '/my-cv/'
  if (command === 'build') {
    // Replace 'your-repository-name' with the actual name of your GitHub repository
    config.base = '/your-repository-name/'; 
  }

  return config;
});
