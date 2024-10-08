import { createServer } from 'vite';

async function startServer() {
  try {
    const server = await createServer({
      // any valid user config options, plus `mode` and `configFile`
      configFile: './vite.config.ts',
      root: process.cwd(),
      server: {
        port: 3000,
      },
    })
    await server.listen()

    server.printUrls()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

startServer()