import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const alias = {
    '@baconfy/ui': resolve(__dirname, './src/index.ts'),
    '@': resolve(__dirname, './src')
  };

  // Configuração para desenvolvimento (pasta dev/)
  if (mode === 'development' || process.env.NODE_ENV === 'development') {
    return {
      plugins: [react()],
      root: 'dev',
      resolve: {
        alias: alias
      },
      esbuild: {
        jsx: 'automatic'
      }
    }
  }

  // Configuração para build da biblioteca
  return {
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'BaconfyUI',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          '@radix-ui/react-slot',
          '@radix-ui/react-accordion',
          '@radix-ui/react-alert-dialog',
          'class-variance-authority',
          'clsx',
          'tailwind-merge',
          'lucide-react'
        ],
        output: {
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
          }
        }
      },
      cssCodeSplit: false,
      sourcemap: true
    },
    resolve: {
      alias: alias
    },
    esbuild: {
      jsx: 'automatic'
    }
  }
})