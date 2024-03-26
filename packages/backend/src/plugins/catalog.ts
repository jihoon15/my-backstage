import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

//[0217 added]
import { GitLabDiscoveryProcessor } from '@backstage/plugin-catalog-backend-module-gitlab';
//[0218 added]
import { GitlabFillerProcessor } from '@immobiliarelabs/backstage-plugin-gitlab-backend';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  //[0217 added]
  builder.addProcessor(
    GitLabDiscoveryProcessor.fromConfig(env.config, { logger: env.logger }),
  );
  //[0218 added]
  builder.addProcessor(new GitlabFillerProcessor(env.config));
  
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
