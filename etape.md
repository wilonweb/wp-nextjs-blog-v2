# NextJS with Wordpres headless

<https://www.youtube.com/watch?v=6eVMBX2u_Ug&list=PLpvmpNjU5ooWkh1xAldsikmTxgoo5gc2v>
Coding reflexions

Installation de nextJS

`npm run dev` pour lancer le projet

### Creation des page et dossier de notre projet

- [pageSlug].js
- contact.js
- /blog
  - - [postSlug].js
  - - index.js
- /category
  - - [categoryName].js

### Creating the Home page with Tailwind CSS - Next.js + Headless WordPress Blog [Part 5]

- L'auteur a ajouté les fichiers de route nécessaires pour un blog Next.js.
- Ils ont débuté avec le fichier `index.js`, responsable de la page d'accueil.
- Les images de logo et de fond ont été téléchargées au préalable et placées dans le dossier public de l'application Next.js.
- Installation de TaillwindCSS avec UsingPostCSS
  `npm install -D tailwindcss postcss autoprefixer`
  Puis on lance la commande d'initialisation `npx tailwindcss init`
  Configuration de `content` dans `/taillwind.config.js` pour la liste de fichier qu'on accepte

```js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Configuration de `/postcss.config.js`
Ajout de `\styles\main.css`pour configurer Tailwind CSS pour un fichier CSS et faire référence à des directives spécifiques de Tailwind CSS. Voici ce que chacune de ces directives fait :

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

@tailwind base; : Cette directive inclut la base de styles de Tailwind CSS dans votre feuille de style. Les styles de base définissent des styles de base pour les éléments HTML, tels que les styles par défaut pour les titres, les paragraphes, les listes, etc. Cela établit la base à partir de laquelle vous pouvez construire vos propres styles.

@tailwind components; : Cette directive inclut les composants de Tailwind CSS dans votre feuille de style. Les composants de Tailwind sont des classes CSS prédéfinies qui définissent des composants d'interface utilisateur courants, tels que des boutons, des formulaires, des alertes, etc. En incluant cette directive, vous avez accès aux styles de ces composants que vous pouvez utiliser dans votre application.

@tailwind utilities; : Cette directive inclut les utilitaires de Tailwind CSS dans votre feuille de style. Les utilitaires de Tailwind sont des classes CSS prédéfinies qui vous permettent de rapidement appliquer des styles à des éléments individuels, tels que la gestion de la taille des polices, des marges, des rembourrages, des couleurs de texte, etc.

- Les composants `head`, `image`, et `link` de Next.js ont été importés pour gérer la structure de la page.
- En utilisant ces composants, une structure de page a été créée avec un en-tête contenant un logo, une navigation, un titre, et un bouton pour accéder au blog.
- Un composant `site header` a été créé pour faciliter la réutilisation de l'en-tête sur d'autres pages.
- La page d'accueil a été stylisée en utilisant des classes de Tailwind CSS pour obtenir une apparence attrayante.
- Le résultat est une page d'accueil accueillante pour un blog de voyage imaginaire, avec un en-tête élégant, un titre accrocheur et un bouton invitant les visiteurs à explorer le blog.

import de `main.css` dans `pages\_app.js`

## Bug :

Je n'arrive pas a afficher un background image appeler avec TaillWind.

Dans mon fichier principal `pages\index.js` j'ai cette ligne
`<div className="min-h-screen bg-[url('/home.jpg')] relative"></div>`
Qui est censé affiché cette image en background
`public\home.jpg`

Pour cela j'ai installer `npm install -D tailwindcss postcss autoprefixer`
Puis j'ai créer le fichier d'initialisation avec `npx tailwindcss init`

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Ensuite j'ai créer `postcss.config.js` les deux plugin ( taillwindCSS et autoPrefixer )

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Puis j'ai créer `styles\main.css` pour importer toute les couche de taillWind css dans le fichier.

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Creation du composant `components\SiteHeader.js` pour l'index principal

### Setup de GraphQL API sur Wordpress

WordPress, servira de backend API pour notre frontend Next.js
configurer un site WordPress sur un serveur VPS cloud, en l'occurrence DigitalOcean ( TODO )

---

Installation du plugin WPGraphQL
Tester une requete avec postMan

Puis installation du plugin HeadlessMode et ajouter a `wp-config`

```php
/* That's all, stop editing! Happy publishing. */
define( 'HEADLESS_MODE_CLIENT_URL', 'http://nextjstest1.local/wp-login' );
```

### Fetch Posts from WordPress GraphQL API

nous allons créer la page d'index du blog pour afficher la liste des articles récupérée à partir de l'API WordPress.

pour cela `pages\blog\index.js` pour charger les articles depuis l'api

`next.config.js`
`components\FeaturedImage.js`
`lib\graphqlRequest.js`

nous avons mis en place un processus de récupération des données depuis l'API GraphQL de WordPress en utilisant la bibliothèque Next.js. Nous avons également créé des composants personnalisés pour afficher les images en vedette de chaque article, les titres, les extraits et les catégories. Enfin, nous avons ajouté un pied de page simple avec un avis de droits d'auteur.
