import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import schema from '@danielblignaut/lambda-gq-resolver/graph-ql/schema';
import lambdaLocal = require('lambda-local');

const app = express();

// Setup local grapql server

// const apolloServer = new ApolloServer({ schema });

app.use(express.text());

app.use('/lambda-a', async (req, res) => {
  console.log(`path is ${path.join(__dirname, '../../../packages/lambda-a/src/index')}`);
  const result = await lambdaLocal.execute({
    lambdaPath: path.join(__dirname, '../../../packages/lambda-a/src/index'),
    lambdaHandler: 'handler',
    envfile: path.join(__dirname, '.env-lambda'),
    event: {
      headers: req.headers, // Pass on request headers
      body: req.body, // Pass on request body
    },
  });

  res
    .status((result as any).statusCode)
    .set((result as any).headers)
    .end((result as any).body);
});

app.use('/lambda-b', async (req, res) => {
  const result = await lambdaLocal.execute({
    lambdaPath: path.join(__dirname, '../../../packages/lambda-b/src/index'),
    lambdaHandler: 'handler',
    envfile: path.join(__dirname, '.env-lambda'),
    event: {
      headers: req.headers, // Pass on request headers
      body: req.body, // Pass on request body
    },
  });

  res
    .status((result as any).statusCode)
    .set((result as any).headers)
    .end((result as any).body);
});

app.use('/lambda-gq-resolver', async (req, res) => {
  const result = await lambdaLocal.execute({
    lambdaPath: path.join(__dirname, '../../../packages/lambda-gq-resolver/src/index'),
    lambdaHandler: 'handler',
    envfile: path.join(__dirname, '.env-lambda'),
    event: {
      headers: req.headers, // Pass on request headers
      body: req.body, // Pass on request body
      httpMethod: req.method,
      // httpStatusCode: req.statusCode,
    },
  });

  res
    .status((result as any).statusCode)
    .set((result as any).headers)
    .end((result as any).body);
});

app.listen(3000, () => console.log('listening on port: 3000'));
