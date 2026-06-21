import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'

export default {
  base: '/',
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
    outDir: '../docs',
    emptyOutDir: true,
  },
}
