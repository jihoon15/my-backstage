// [240207] added for jenkins 
import {
    createRouter,
    DefaultJenkinsInfoProvider,
  } from '@backstage/plugin-jenkins-backend';
  // import { createRouter } from '@internal/plugin-myplugin-backend'; // [240210] added for test
  import { Router } from 'express';
  import { PluginEnvironment } from '../types';
  import { CatalogClient } from '@backstage/catalog-client';
  
  export default async function createPlugin(
    env: PluginEnvironment,
  ): Promise<Router> {
    const catalog = new CatalogClient({
      discoveryApi: env.discovery,
    });
  
    return await createRouter({
      logger: env.logger,
      jenkinsInfoProvider: DefaultJenkinsInfoProvider.fromConfig({
        config: env.config,
        catalog,
      }),
      permissions: env.permissions,
    });
  }