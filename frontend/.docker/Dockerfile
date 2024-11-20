FROM node:20-alpine3.18
RUN corepack enable
RUN corepack prepare yarn@4.0.1 --activate
RUN yarn set version 4.0.1
RUN yarn -v
RUN yarn config set --home enableTelemetry 0