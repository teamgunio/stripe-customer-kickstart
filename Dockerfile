FROM node:carbon

ENV WORKDIR /var/lib/gunio
RUN mkdir -p $WORKDIR
WORKDIR ${WORKDIR}

COPY .babelrc .babelrc
COPY webpack.deployment.config.js webpack.deployment.config.js

COPY client client
COPY server server

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

CMD ["yarn", "run", "serve"]
