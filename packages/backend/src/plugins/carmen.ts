import { createRouter } from '@internal/plugin-carmen-backend';
import { Router } from 'express';
import express from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  // Here is where you will add all of the required initialization code that
  // your backend plugin needs to be able to start!
  const router = Router();
  router.use(express.json());

  // router.get('/hello', (_, response) => {
  //   response.json({ response: 'hello world!' });
  // });

  // router.use('/custom_jenkins', async (__, res) => {
  //   try {
  //     // Fetch data from the external API
  //     const username = 'admin';
  //     const apiToken = '1150f5db6dfb977670db7d57cd18f89e12';
  //     const basicAuthHeader = 'Basic ' + btoa(username + ':' + apiToken);
      
  //     const response = await fetch('http://localhost:8080/job/test_bs_CI/api/json', {
  //         headers: {
  //           Authorization: basicAuthHeader
  //         }
  //       });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data from external API');
  //     }

  //     // // Parse the JSON response
  //     const data = await response.json();

  //     // // Respond with the fetched data
  //     res.json(data);
  //     // res.json({ response: 'hello world!' });
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error fetching data:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  // The env contains a lot of goodies, but our router currently only
  // needs a logger
  return await createRouter({
    logger: env.logger,
  });
}