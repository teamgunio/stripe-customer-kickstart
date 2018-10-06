FROM node:carbon

ENV WORKDIR /var/lib/gunio
RUN mkdir -p $WORKDIR
WORKDIR ${WORKDIR}

RUN npm i -g yarn

COPY client client
COPY server server

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .babelrc .babelrc
COPY webpack.config.js webpack.config.js

RUN yarn install --production

CMD ["yarn", "run", "start"]
