import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  if (mode === 'production' && !env.VITE_API_BASE_URL) {
    throw new Error('Set VITE_API_BASE_URL before building for production.')
  }

  return { plugins: [react()] }
})
