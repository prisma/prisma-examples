import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Resource } from 'sst';
import { getDb } from './db';

const prisma = getDb({ connectionString: Resource.DATABASE_URL.value })

export const handler = async (evt: APIGatewayProxyEventV2) => {
  if (evt.requestContext.http.method !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Allow': 'GET',
      },
      body: JSON.stringify({
        error: 'Method Not Allowed',
      }),
    };
  }

  try {
    const quotes = await prisma.quotes.findMany({ take: 2 })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: quotes }),
    }
  } catch (err) {
    console.error('Failed to fetch quotes', { err, reqId: evt.requestContext.requestId })
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
};
