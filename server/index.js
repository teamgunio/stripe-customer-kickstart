import {} from 'dotenv/config';

import express from 'express'; 
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';

const PORT = process.env.HTTP_PORT || 3000;

const app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.post('/api/token', (req, res) => {
  res.send('Ok');
});

if (!module.parent) {
  const { npm_package_name, npm_package_version } = process.env;
  console.log(
    `${npm_package_name} @${npm_package_version} is running with:
      port: ${PORT}`
  );

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

