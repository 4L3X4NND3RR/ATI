FROM node:14 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/FrontendFuentesHotel /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN apk update
RUN apk upgrade
RUN apk add bash
RUN apk add openssl
RUN /bin/bash -c "openssl req -x509 -out etc/ssl/localhost.crt -keyout etc/ssl/localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf '[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth')"
