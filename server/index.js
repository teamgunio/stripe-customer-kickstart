import {} from 'dotenv/config';
import path from 'path';
import express from 'express';

const PORT = process.env.HTTP_PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

const publicPath = express.static(path.join(__dirname, '../dist'));
const indexPath = path.join(__dirname, 'index.html');

app.use('/dist', publicPath);
app.get('/', function (_, res) { res.sendFile(indexPath) });

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

