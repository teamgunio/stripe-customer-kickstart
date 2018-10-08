FROM node:carbon

ENV WORKDIR /var/lib/gunio
RUN mkdir -p $WORKDIR
WORKDIR ${WORKDIR}

COPY dist dist

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .babelrc .babelrc

RUN yarn install --production

CMD ["yarn", "run", "serve"]
