import { APIGatewayProxyEventV2 } from 'aws-lambda';
import prisma from './db';

export const handler = async (evt: APIGatewayProxyEventV2) => {
  if (evt.requestContext.http.method !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: 'Method Not Allowed',
      }),
    };
  }
  
  const quotes = await prisma.quotes.findMany({ take: 2 })

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: quotes,
    }, null, 2),
  };
};
