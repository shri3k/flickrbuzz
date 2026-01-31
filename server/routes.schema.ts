import { Type } from '@sinclair/typebox';

const ResponseItem = Type.Object({
  title: Type.String(),
  link: Type.String(),
  date_taken: Type.String(),
  published: Type.String(),
  author: Type.String(),
  author_id: Type.String(),
  description: Type.String(),
  tags: Type.String(),
  media: Type.Object({
    m: Type.String(),
  }),
});

export const PublicFeed = {
  query: Type.Object({}, { additionalProperties: false }),
  response: {
    200: Type.Array(ResponseItem),
  },
};

export const Search = {
  query: Type.Object({
    q: Type.String({ minLength: 1 }),
    mode: Type.Optional(
      Type.Union([Type.Literal('all'), Type.Literal('any')], { default: 'all' })
    ),
  }),
  response: {
    200: Type.Array(ResponseItem),
  },
};
