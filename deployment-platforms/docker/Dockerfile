FROM node:12.4.0
RUN openssl version -v
RUN uname -a

ADD ./ /opt/app
WORKDIR /opt/app

RUN rm -rf node_modules \
  && npm i -g --unsafe-perm prisma2@latest  \
  && npm install \
  && chown -R node /opt/app

RUN prisma2 generate

EXPOSE 8080

CMD ["npm", "run", "start"]
