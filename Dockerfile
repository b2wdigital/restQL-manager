FROM node:10.15-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY LICENSE /app/LICENSE
COPY README.md /app/README.md

RUN npm install -g @b2wdigital/restql-manager

CMD ["restql-manager"]
