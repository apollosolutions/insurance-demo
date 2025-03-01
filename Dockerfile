FROM node:20-buster-slim
ENV PORT 8080
ARG SUBGRAPH_DIR

WORKDIR /app

COPY ${SUBGRAPH_DIR} /app/

RUN npm install

EXPOSE ${PORT}
CMD [ "npm", "start" ]