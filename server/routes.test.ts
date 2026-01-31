import { test } from 'node:test';
import assert from 'node:assert';
import { buildApp } from './index.ts';

test('GET / returns 200', async (t) => {
  const app = buildApp({
    logger: false,
  });

  t.after(() => app.close());

  await t.test('root', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    assert.strictEqual(response.statusCode, 200);
  });

  await t.test('search', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/search?q=funny',
    });

    assert.strictEqual(response.statusCode, 200);
  });
});
