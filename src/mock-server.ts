import { createServer, Model } from 'miragejs';
import { phantomsSeed } from './data/seeds/phantoms';
import { IPhantom } from '@phantombuster/phantoms/types';

export const mockServer = ({ environment = 'development' } = {}) => {
  return createServer({
    environment,

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
      this.post('/phantoms');
      this.patch('/phantoms/:id/name');
      this.delete('/phantoms/:id');
    },
  });
};
