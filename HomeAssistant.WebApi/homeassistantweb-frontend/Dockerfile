# Étape de construction
FROM node:20 AS build
WORKDIR /app

# Copier le package.json et package-lock.json pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application Next.js
RUN npm run build

# Étape de production
FROM node:20 AS production
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'exécution
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Exposer le port 3000 pour l'application Next.js
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
