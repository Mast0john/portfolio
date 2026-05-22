# 📌 MEMO - Commandes Gatsby

> **Liste complète des commandes utiles pour développer avec Gatsby** > _Dernière mise à jour : 20 mai 2026_

---

## 🏗️ **Développement local**

| Commande                            | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `npm run develop`                   | Lance le serveur de développement (mode _hot-reload_).                       |
| `npm run develop -- --host 0.0.0.0` | Lance le serveur accessible depuis le réseau local (ex: `http://<IP>:8000`). |
| `npm run develop -- --port 9000`    | Change le port par défaut (`8000` → `9000`).                                 |
| `npm run develop --verbose`         | Affiche les logs détaillés.                                                  |
| `gatsby develop --open`             | Ouvre automatiquement le navigateur à `http://localhost:8000`.               |

---

## 🧹 **Nettoyage & Cache**

| Commande                          | Description                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `gatsby clean` ou `npm run clean` | **Supprime** le dossier `.cache/` et `public/` (résout 90% des bugs de build). |
| `rm -rf .cache public`            | Alternative manuelle pour nettoyer les dossiers (Linux/macOS).                 |
| `gatsby clean --all`              | Nettoie **tout** (cache, dépendances, etc.).                                   |

---

## 🚀 **Build & Production**

| Commande                          | Description                                                      |
| --------------------------------- | ---------------------------------------------------------------- |
| `npm run build` ou `gatsby build` | Génère les fichiers statiques dans `/public`.                    |
| `npm run build -- --prefix-paths` | Active le _prefix_ pour les paths (utile pour GitHub Pages).     |
| `npm run serve`                   | Serve le build en local (`/public`) sur `http://localhost:9000`. |
| `gatsby serve --port 8080`        | Serve le build sur un port personnalisé.                         |
| `gatsby build --no-ugly`          | Désactive la minification du JS (debug).                         |

---

## 🔍 **GraphQL**

| Commande                             | Description                                                          |
| ------------------------------------ | -------------------------------------------------------------------- |
| `http://localhost:8000/__graphql`    | Ouvre **GraphiQL** (interface interactive pour tester les requêtes). |
| `gatsby develop --graphql-port 8001` | Change le port de GraphiQL (ex: `http://localhost:8001/__graphql`).  |
| `gatsby repl`                        | Lance un **REPL** (interpréteur Node.js avec le contexte Gatsby).    |

---

## 🐛 **Debugging & Optimisation**

| Commande                     | Description                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gatsby develop --log-pages` | Affiche les pages générées dans la console.                                                                                                                         |
| `gatsby develop --inspect`   | Active le **debugger Node.js** (pour VS Code/Chrome DevTools).                                                                                                      |
| `gatsby develop --profile`   | Génère un rapport de performance (dans `/public/profile/`).                                                                                                         |
| `npm run analyze`            | Analyse la taille des bundles (nécessite [`gatsby-plugin-bundle-analyser`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-bundle-analyser)). |
| `gatsby develop --https`     | Lance le serveur en **HTTPS** (pour tester les cookies sécurisés).                                                                                                  |

---

## 📦 **Plugins & Starters**

| Commande                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `gatsby new mon-projet https://github.com/gatsbyjs/gatsby-starter-default` | Crée un nouveau projet avec un _starter_ officiel.                         |
| `gatsby new mon-projet`                                                    | Crée un projet avec le starter par défaut.                                 |
| `gatsby info`                                                              | Affiche les infos de l’environnement (versions de Gatsby, Node, OS, etc.). |
| `gatsby plugin docs`                                                       | Ouvre la documentation des plugins installés.                              |

---

## 🔄 **Workflow Avancé**

| Commande                                            | Description                                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| `gatsby develop --no-hmr`                           | Désactive le _Hot Module Replacement_ (pour debugger sans reload).          |
| `gatsby build --prefix-paths`                       | Préfixe tous les liens avec un chemin (ex: `/mon-site/` pour GitHub Pages). |
| `gatsby build --out /chemin/personnalise`           | Change le dossier de sortie (par défaut: `/public`).                        |
| `cross-env GATSBY_EXPERIMENTAL=true gatsby develop` | Active les fonctionnalités expérimentales.                                  |

---

## 📂 **Fichiers & Structure**

| Commande                                 | Description                                          |
| ---------------------------------------- | ---------------------------------------------------- |
| `gatsby develop --pages`                 | Affiche la liste des pages générées.                 |
| `gatsby develop --static`                | Génère uniquement les fichiers statiques (sans SSR). |
| `gatsby develop --trailing-slash=always` | Force les URLs à se terminer par `/`.                |

---

## ⚡ **Astuces Bonus**

### 1. Raccourcis GraphQL

- Dans `http://localhost:8000/__graphql`, appuie sur **`Ctrl + Space`** pour l’autocomplétion.
- Utilise **`Shift + Ctrl + P`** pour formater la requête.

### 2. Variables d’environnement

```bash
# Dans un fichier .env.development
GATSBY_API_URL=https://dev-api.example.com
# Puis lance :
gatsby develop
```

> ⚠️ **Important** : Les variables doivent être préfixées par `GATSBY_` pour être accessibles côté client.

### 3. Désactiver le cache

```bash
gatsby develop --no-cache
```

### 4. Vérifier les dépendances

```bash
npm ls gatsby
```

### 5. Mettre à jour Gatsby

```bash
npm update gatsby gatsby-cli
```

---

## 📝 **Exemple de `package.json` typique**

```json
{
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "analyze": "gatsby build --analyze",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

---

## 🔗 **Ressources Utiles**

- [Documentation Officielle Gatsby](https://www.gatsbyjs.com/docs/)
- [Cheat Sheet Gatsby CLI](https://www.gatsbyjs.com/docs/gatsby-cli/)
- [Dépannage (Debugging)](https://www.gatsbyjs.com/docs/debugging-the-build-process/)
