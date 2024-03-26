import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });
  router.get('/hello', (_, response) => {
    logger.info('PONG!');
    response.json({ response: 'hello world!' });
  });
  router.get('/custom_jenkins', async (__, res) => {
    try {
      // Fetch data from the external API
      const username = 'admin';
      const apiToken = '1150f5db6dfb977670db7d57cd18f89e12';
      const basicAuthHeader = 'Basic ' + btoa(username + ':' + apiToken);
      
      const response = await fetch('http://localhost:8080/job/test_bs_CI/api/json', {
          headers: {
            Authorization: basicAuthHeader
          }
        });

      if (!response.ok) {
        throw new Error('Failed to fetch data from external API');
      }

      // // Parse the JSON response
      const data = await response.json();

      // // Respond with the fetched data
      res.json(data);
      // res.json({ response: 'hello world!' });
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.use(errorHandler());
  return router;
}
