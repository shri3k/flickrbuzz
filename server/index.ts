import process from 'node:process';
import cors from '@fastify/cors';
import Fastify from 'fastify';

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import routes from './routes.ts';

const { PORT = 8080 } = process.env;

export function buildApp(opts = {}) {
  const app = Fastify({
    ...opts,
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  app.register(routes);
  app.register(cors, {
    origin: (origin: string | URL, cb) => {
      if (!origin) {
        // allow reqs from other client than browser
        cb(null, true);
        return;
      }
      const hostname = new URL(origin).hostname;
      if (hostname === 'localhost') {
        cb(null, true);
        return;
      }
      cb(new Error('Not allowed'), false);
    },
  });
  return app;
}

if (import.meta.main) {
  const app = buildApp();
  app.listen({ port: PORT as number }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  });
}
