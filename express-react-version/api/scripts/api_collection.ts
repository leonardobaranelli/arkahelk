import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface Endpoint {
  name: string;
  method: string;
  path: string;
}

interface PostmanCollection {
  info: {
    name: string;
    schema: string;
  };
  item: any[];
  variable: {
    key: string;
    value: string;
    type: string;
  }[];
}

function createPostmanCollection(): void {
  const collection: PostmanCollection = {
    info: {
      name: 'API Endpoints',
      schema:
        'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: [],
    variable: [
      {
        key: 'base_url',
        value: process.env.BASE_URL || 'http://localhost:3001',
        type: 'string',
      },
    ],
  };

  const baseUrl = '{{base_url}}';

  const endpoints: Record<string, Endpoint[]> = {
    Users: [
      { name: 'Get All Users', method: 'GET', path: '/users' },
      { name: 'Get User by Name', method: 'GET', path: '/users/name/{{name}}' },
      { name: 'Get User by ID', method: 'GET', path: '/users/id/{{id}}' },
      { name: 'Register User', method: 'POST', path: '/users/register' },
      { name: 'Login User', method: 'POST', path: '/users/login' },
      {
        name: 'Update User by Name',
        method: 'PUT',
        path: '/users/name/{{name}}',
      },
      { name: 'Update User by ID', method: 'PUT', path: '/users/id/{{id}}' },
      { name: 'Delete All Users', method: 'DELETE', path: '/users/all' },
      {
        name: 'Delete User by Name',
        method: 'DELETE',
        path: '/users/name/{{name}}',
      },
      { name: 'Delete User by ID', method: 'DELETE', path: '/users/id/{{id}}' },
    ],
  };

  for (const [folderName, folderEndpoints] of Object.entries(endpoints)) {
    const folder = {
      name: folderName,
      item: folderEndpoints.map((endpoint) => ({
        name: endpoint.name,
        request: {
          method: endpoint.method,
          header: [],
          url: {
            raw: `${baseUrl}${endpoint.path}`,
            host: ['{{base_url}}'],
            path: endpoint.path.split('/').slice(1),
          },
        },
        response: [],
      })),
    };
    collection.item.push(folder);
  }

  const outputPath = path.join(__dirname, 'api_collection.json');
  fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));
}

createPostmanCollection();
