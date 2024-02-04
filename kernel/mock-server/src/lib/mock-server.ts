import { createServer, Model, Response, RestSerializer } from 'miragejs';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { IPhantom } from '@phantombuster/phantoms/types';

import { phantomsSeed } from './data/seeds/phantoms';

const MIRAGE_DB_CACHE_KEY = 'mirage-db' as const;

export const mockServer = ({ environment = 'development' } = {}) => {
  const server = createServer({
    environment,

    serializers: {
      application: RestSerializer,
    },

    models: {
      phantom: Model.extend<Partial<IPhantom>>({}),
    },

    seeds(server) {
      const localCache = localStorage.getItem(MIRAGE_DB_CACHE_KEY);

      // Load local cache if it exists, else load seed data.
      if (localCache) {
        server.db.loadData(JSON.parse(localCache));
        return;
      }

      phantomsSeed.forEach((phantom) => {
        server.create('phantom', phantom);
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/phantoms');
      // eslint-disable-next-line sonarjs/no-duplicate-string -- Easier to read
      this.get('/phantoms/:id');
      this.delete('/phantoms/:id');

      this.patch('/phantoms/:id', (schema, request) => {
        const original = schema.findBy('phantom', { id: request.params.id });

        if (!original) {
          return new Response(400);
        }

        const { name } = z
          .object({ name: z.string().optional() })
          .parse(JSON.parse(request.requestBody));

        if (!name) {
          return new Response(400);
        }

        original.update({
          name,
        });

        return new Response(200);
      });

      this.post('/phantoms/:id/duplicate', (schema, request) => {
        const original = schema.findBy('phantom', { id: request.params.id });

        if (!original) {
          return new Response(400);
        }

        schema.create('phantom', {
          ...original.attrs,
          id: uuid(),
        });

        return new Response(200);
      });

      this.post('/__mirage/reset', (schema) => {
        localStorage.removeItem(MIRAGE_DB_CACHE_KEY);
        schema.db.emptyData();

        phantomsSeed.forEach((phantom) => {
          schema.create('phantom', phantom);
        });

        return new Response(200);
      });
    },
  });

  const originalHandledRequest = server.pretender.handledRequest;
  server.pretender.handledRequest = (verb, path, request) => {
    if (!['get', 'head'].includes(verb.toLowerCase())) {
      localStorage.setItem(
        MIRAGE_DB_CACHE_KEY,
        JSON.stringify(server.db.dump())
      );
    }

    originalHandledRequest.call(server.pretender, verb, path, request);
  };

  return server;
};
