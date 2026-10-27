import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // 👈 이 줄이 브라우저 DOM(document)을 만들어줍니다!
    setupFiles: './src/setupTests.js', // (선택: jest-dom 매처 등록용)
  },
})