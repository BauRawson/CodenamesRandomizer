import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'

export default {
  base: '/',
  plugins: [
    basicSsl(),
    legacy({
      targets: ['defaults', 'not IE 11', 'chrome >= 56', 'safari >= 10'],
      renderModernChunks: false,
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
