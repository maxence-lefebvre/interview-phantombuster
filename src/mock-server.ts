import { createServer, Model, Response, RestSerializer } from 'miragejs';
import { v4 as uuid } from 'uuid';

import { IPhantom } from '@phantombuster/phantoms/types';

import { phantomsSeed } from './data/seeds/phantoms';

export const mockServer = ({ environment = 'development' } = {}) => {
  return createServer({
    environment,

    serializers: {
      application: RestSerializer,
    },

    models: {
      phantom: Model.extend<Partial<IPhantom>>({}),
    },

    seeds(server) {
      phantomsSeed.forEach((phantom) => {
        server.create('phantom', phantom);
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/phantoms');

      this.patch('/phantoms/:id/name');
      this.delete('/phantoms/:id');

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
    },
  });
};
