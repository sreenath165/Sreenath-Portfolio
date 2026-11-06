import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import chatHandler from './api/chat'

function devApiMiddleware(apiKey: string): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/health') {
          const configured = Boolean(process.env.GROQ_API_KEY || apiKey)
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = configured ? 200 : 503
          res.end(JSON.stringify({ status: configured ? 'healthy' : 'unconfigured' }))
          return
        }

        if (req.url === '/api/chat' && req.method === 'POST') {
          process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || apiKey

          let body = ''
          req.on('data', chunk => {
            body += chunk
          })

          req.on('end', async () => {
            try {
              const parsedBody = JSON.parse(body || '{}')
              const mockReq = {
                method: req.method,
                headers: req.headers,
                body: parsedBody,
                query: {},
                cookies: {},
              }

              const mockRes: any = {
                setHeader(name: string, value: string) {
                  res.setHeader(name, value)
                  return mockRes
                },
                status(code: number) {
                  res.statusCode = code
                  return mockRes
                },
                json(data: any) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                  return mockRes
                },
                end(data?: any) {
                  res.end(data)
                  return mockRes
                },
              }

              await (chatHandler as any)(mockReq, mockRes)
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Dev server error handling chat' }))
            }
          })
          return
        }

        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.GROQ_API_KEY || ''

  return {
    plugins: [react(), devApiMiddleware(apiKey)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'lucide-react',
        'react-icons/fa',
        'clsx',
        'tailwind-merge',
        '@hookform/resolvers/zod',
        'react-hook-form',
        'zod',
      ],
    },
  }
})
