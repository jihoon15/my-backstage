import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const mypluginPlugin = createPlugin({
  id: 'myplugin',
  routes: {
    root: rootRouteRef,
  },
});

export const MypluginPage = mypluginPlugin.provide(
  createRoutableExtension({
    name: 'MypluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
