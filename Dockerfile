FROM node:16 as BUILD
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i --no-optional

COPY src/ ./src
COPY static/ ./static
COPY svelte.config.js ./
COPY tsconfig.json ./
ENV NODE_ENV production
ENV VITE_FIREBASE_CONFIG ${VITE_FIREBASE_CONFIG:-"{}"}
ENV VITE_API_PREFIX ${VITE_API_PREFIX:-"http://cms"}
ENV VITE_MEILISEARCH_URL ${VITE_MEILISEARCH_URL:-"http://search"}
ENV VITE_MEILISEARCH_PUBLIC_API_KEY ${VITE_MEILISEARCH_PUBLIC_API_KEY:-"blank"}
RUN npm run build

EXPOSE 3000

CMD ["node", "./build"]
