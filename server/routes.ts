import type { FastifyInstance as Fastify } from 'fastify';
import { type Static } from '@sinclair/typebox';

import flickr from './flickr.ts';
import { PublicFeed, Search } from './routes.schema.ts';

export type SearchQuery = Static<typeof Search.query>;
const withSchema = <T>(schema: T): { schema: T } => ({
  schema,
});

export default async function routes(fastify: Fastify) {
  fastify.get('/', withSchema(PublicFeed), async (_, reply) => {
    const data = await flickr.publicFeed();
    reply.send(data);
  });
  fastify.get('/search', withSchema(Search), async (request, reply) => {
    const { q, mode } = request.query as SearchQuery;
    console.log('Search query:', q, 'Mode:', mode);
    const data = await flickr.search(q, mode);
    reply.send(data);
  });
}
