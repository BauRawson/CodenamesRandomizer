import { resolve } from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'

export default {
  base: '/play/',
  plugins: [
    basicSsl(),
    legacy({
      targets: ['chrome >= 47'],
    }),
  ],
  server: {
    https: true,
    host: true,
  },
  build: {
    outDir: '../docs/play',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'codigo-secreto': resolve(__dirname, 'codigo-secreto.html'),
        'trivia': resolve(__dirname, 'trivia.html'),
        'mimica': resolve(__dirname, 'mimica.html'),
      },
    },
  },
}
