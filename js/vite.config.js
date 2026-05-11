import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  base: '/CodenamesRandomizer/',
  plugins: [basicSsl()],
  server: {
    https: true,
    host: true,
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
}
