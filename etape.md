# NextJS with Wordpres headless

username: nextjs_user
password: password

<https://www.youtube.com/watch?v=6eVMBX2u_Ug&list=PLpvmpNjU5ooWkh1xAldsikmTxgoo5gc2v>
Coding reflexions

Installation de nextJS

`npm run dev` pour lancer le projet

### Update

Note la fonction GetAllPost du début est renommé getPostList

### Creation des page et dossier de notre projet

- /pages
- [pageSlug].js
- contact.js
- /blog
  - - [postSlug].js
  - - index.js
- /category
  - - [categoryName].js

### Creattion de la page d'acceuil avec Tailwind CSS - Next.js + Headless WordPress Blog

- L'auteur a ajouté les fichiers de route nécessaires pour un blog Next.js.
- Ils ont débuté avec le fichier `index.js`, responsable de la page d'accueil.
- Les images de logo et de fond ont été téléchargées au préalable et placées dans le dossier public de l'application Next.js.
- Installation de TaillwindCSS avec UsingPostCSS
  `npm install -D tailwindcss postcss autoprefixer`
  Puis on lance la commande d'initialisation `npx tailwindcss init`
  Configuration de `content` dans `/taillwind.config.js` pour lister les type de fichier qu'on accepte

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

### SetUp de GraphQL pour WPheadless

WordPress, servira de backend API pour le frontend Next.js
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

Voici le processus

Creation de `lib\graphqlRequest.js` qui contient toute les details de la requette HTTP pour interagir avec un serveur GraphQL
( Elle gère les en-têtes (headers) et le corps (body) des requêtes )

`lib\posts.js` : Définis une query pour définir ce que la requette doit extraire de l'API graphQL pour cela on selectionne les élément désiré depuis leplugin GraphQL sur le backend Wordpress

`next.config.js` : Pour configurer le projet nextJS ( performance, sécurité ... )

- next/image pour effectuer un certain nombre de vérifications pour s'assurer que les images sont sûres et provenant de sources approuvées.
- remotePatterns vous permet de spécifier les modèles d'URLs d'images distantes qui sont autorisés dans votre application.

`components\FeaturedImage.js` : Pour afficher une image à la une d'un article avec un lien vers le détail de l'article.

pour cela on créé `pages\blog\index.js` pour afficher l'archive des article du backend coté front en les chargrant depuis l'API graphQL

nous avons mis en place un processus de récupération des données depuis l'API GraphQL de WordPress en utilisant la bibliothèque Next.js. Nous avons également créé des composants personnalisés pour afficher les images en vedette de chaque article, les titres, les extraits et les catégories. Enfin, nous avons ajouté un pied de page simple avec un avis de droits d'auteur.

Creation de `components\SiteFooter.js`

### Convertir les chaine de date

On utilise npm Date-fns pour le formatage des dates, dans notre application NextJS

Pour cela on ajoute dans `pages\blog\index.js`
`<div className="py-4">Published on {post.date}</div>`

installation de `npm install date-fns`

creation de `components\Date.js` pour définir le format de la date

```js
import { format, parseISO } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, "LLL d, yyyy")}</time>;
}
```

Et on apelle le composant dans `pages\blog\index.js`

Ensuite on telecharge le package date-fns et on consulte la documentation [parseIso](https://date-fns.org/v2.30.0/docs/parseISO)
et [format](https://date-fns.org/v2.30.0/docs/format)pour choisir le format

Pour afficher la date de publication sur une page de blog en utilisant les données provenant de l'API GraphQL de WordPress dans un projet Next.js

extraire la date de publication des articles en utilisant une requête GraphQL. Les dates sont fournies au format ISO standard.

La bibliothèque JavaScript appelée Date-fns permet de manipuler et de formater les dates de différentes manières pour les affiché de manière plus lisible.

création d'un composant de date personnalisé qui prend une date au format ISO en tant que prop pour formater cette date en une forme plus conviviale, par exemple "publié le 21 décembre 2022".

comment intégrer ce composant de date dans la page du blog pour afficher la date de publication de chaque article.

### Creér la single page

Maintenat qu'on a créer la page d'acceuil et la page d'archive qui liste les articles du blog on vas récupérer les données des single pages en utilisant `getStaticProps` et `getStaticPaths`pour générer des pages statiques à partir de données dynamiques

`getStaticProps` est une méthode qui permet de définir les propriétés statiques d'une page. Elle est utilisée pour obtenir des données qui seront précalculées au moment de la génération de la page statique. Ces données sont ensuite injectées en tant que propriétés de la page. Cela permet d'optimiser les performances en évitant de requêter les données à chaque visiteur de la page. Elle est couramment utilisée pour les pages dont le contenu est statique ou qui ne changent pas fréquemment.

`getStaticPaths` est une méthode utilisée pour déterminer les chemins possibles des pages dynamiques. Elle est utilisée en conjonction avec getStaticProps pour générer des pages statiques pour chaque chemin dynamique spécifié. Elle permet à Next.js de savoir quelles pages dynamiques doivent être générées en statique lors de la construction de l'application.

Pour cela on insère notre query dans `lib\posts.js` ou on définis la fonction `getSinglePost` contenant la query dont on a besoin pour afficher le contenue de notre singlePage
dans `pages\blog\[postSlug].js` qui affiche le contenue coté front.

### Formatter le contenue

Maintenant qu'on a créer la page d'acceuil
La page d'archive qui liste les articles
Et la single page qui affiche le contenue d'un article
On vas mainteant faire de la mise en forme et ajouter quelque éléments comme la date et la derniere modification de l'article.

Pour cela on créé du style dans `styles\main.css` en ajoutant un layer @utilities pour personaliser les classe de maniere selective. comment par exemple les p a l'interieur d'un element HTML avec la clzss post-content.

et on ajouté également un composant Date dans `pages\blog\[postSlug].js`

## Creer la page a propos ( static page )

On vas faire la page a propos et la page privacy pour cela

je place dans `pages\[pageSlug].js` les fonction :

- **getStaticPaths** chargée de définir la liste des valeurs possibles pour le paramètre d'URL "page-slug" dans et
- **getStaticProps** destinée à récupérer les données de la page actuelle en fonction du chemin de l'URL

```js
export async function getStaticProps({ params }) {
  const pageData = await getSinglePage(params.pageSlug);

  return {
    props: {
      pageData,
    },
  };
}

export async function getStaticPaths() {
  const pageSlugs = await getPageSlugs();

  return {
    paths: pageSlugs.map((s) => ({
      params: {
        pageSlug: s.slug,
      },
    })),
    fallback: false,
  };
}
```

Puis je créé `lib\page.js` avec une async fonction **getPageSlug** pour y poser la query qui récupérera les slug des page static de notre installation wordpress.

```js
export async function getPageSlugs() {
  const query = {
    query: `query getPageSlugs {
            pages {
              nodes {
                slug
              }
            }
          }`,
  };

  const resJson = await graphqlRequest(query);
  const slugs = resJson.data.pages.nodes;
  return slugs;
}
```

Puis j'appelle le await **getPageSlug** dans la fonction **getStaticPaths** presente dans `pages\[pageSlug].js`
Je retourne chaque slug dans une map ?

Puis je créé `lib\page.js` ou on pose la query en creant la fonction **await getSinglePage**
Puis j'appelle la fonction **await getSinglePage** dans la fonction **getStaticProps** presente dans `pages\[pageSlug].js`

## Gestionnaire de formulaire ( creation de la page contact )

On créer le formulaire dans `pages\contact.js` et on ajoute le style dans `main/css`

```js
import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-contact"></SiteHeader>
      </section>

      <section>
        <div className="container mx-auto lg:max-w-4xl">
          <h1 className="text-4xl text-center text-sate-700 py8">Contact Us</h1>
          <form action="" className="contact-form">
            <label htmlFor="">First Name:</label>
            <input type="text" id="firstName" name="firstName" />
            <label htmlFor="">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
```

Ensuite on ajoute le gestionnaire d'evenement

```js
/*
import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
*/

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = {
    firstName: event.target.firstName.value,
    email: event.target.email.value,
    message: event.target.message.value,
  };
  console.log(data);
};
/*
export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-contact"></SiteHeader>
      </section>

      <section>
        <div className="container mx-auto lg:max-w-4xl">
          <h1 className="text-4xl text-center text-sate-700 py8">Contact Us</h1>
          <form action="" className="contact-form" */>onSubmit={handleSubmit}>/*
            <label htmlFor="">First Name:</label>
            <input type="text" id="firstName" name="firstName" />
            <label htmlFor="">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
*/
```

Création du gestionnaire de route `pages\api\form.js` pour traiter la requette liée au formulaire de contact

```js
export default function handler(req, res) {
  const body = req.body;

  if (!body.firstName || !body.email || !body.message) {
    return res
      .status(400)
      .json({ data: "first name, email, and message fields are required!" });
  }
  return res.status(200).json({ data: "form submitted successfully" });
}
```

Création de la requette HTTP coté client dans `pages\contact.js` avec :

Creation du useState pour gerer :
le statut du formulaire de contact : ( savoir si les champs sont remplis )
le message de réponse : (le message définis dans le gestionnaire de retoute )
et la couleur du message d'alerte : ( différente en fonction de la reussite ou de l'echec de la réponse )

```js
/*
import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";

export default function Contact() {*/
const [submitStatus, setSubmitStatus] = useState(false);
const [responseMessage, setResponseMessage] = useState("");
const [alertColor, setAlertColor] = useState("bg-green-500");
/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      firstName: event.target.firstName.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };
    const jsonData = JSON.stringify(data);
*/
const response = await fetch("/api/form", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: jsonData,
});

const result = await response.json();
console.log(result.data);

setSubmitStatus(true);
setResponseMessage(result.data);

if (!response.ok) {
  setAlertColor("bg-red-500");
} else {
  setAlertColor("bg-green-500");
}
/*};

  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-contact"></SiteHeader>
      </section>

      <section>
        <div className="container mx-auto lg:max-w-4xl">
          <h1 className="text-4xl text-center text-sate-700 py8">Contact Us</h1>
          <form action="" className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="">First Name:</label>
            <input type="text" id="firstName" name="firstName" />
            <label htmlFor="">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Submit</button>
          </form>*/
{
  submitStatus ? (
    <SubmissionAlert message={responseMessage} alertColor={alertColor} />
  ) : null;
}
/*</div>
      </section>
    </>
  );
}*/

const SubmissionAlert = ({ message, alertColor }) => {
  return <div className={`${alertColor}`}>{message}</div>;
};
```

Couper coller le gestionnaire de formulaire dans le JSX ( pourquoi ) ?

## Implementer le boutton Load More

nous utilisons la pagination basée sur le curseur. C'est un peu différent de la pagination normale et offre plusieurs avantages de performances.

La différence est que la pagination traditionnelle basée sur les pages utilise des requêtes basées sur un décalage (offset) et une limite (limit), tandis que la pagination basée sur le curseur repose sur les informations de la page (page info) fournies par l'API GraphQL.

Ces informations incluent le curseur de fin, le curseur de début, a une page suivante et a une page précédente.

Pour cela dans GraphQL on utilise la query getAllPosts pour voir les propriété

PageInfo {
endCursor
hanNextPage
hasPreviousPage
startCursor
}

Ensuite dans la rubrique posts du QueryComposer on a :
after :
before :
first :
last :

Supposon que nous voulons 5 posts par requete

Je récupere la repondse de la props endCursor apres avoir lancé la Query
YXJyYXljb25uZWN0aW9uOjQw
Je met
first : 5
Puis je récupère la nouvelle reponse dans la valeur de la propriété endCursor que je cole dans
after : YXJyYXljb25uZWN0aW9uOjQw

Je relance la query
puis je re récupère la valeur de endCursor
pour avoir les post de 6 a 10

Et ainsi de suite jusqu'a que la valeur de hasNextPage soit true

Ensuite on ajoute dans notre Query la condition
where:
orderby: field: DATE,
order: DESC

Puis on ajoute dans `lib\posts.js` une constante qui a notre condition et en ajoutant l'argument endCursor a la fonction getAllPosts ( que l'on a renommé getPostList)

```js
// Importe la fonction graphqlRequest depuis un module local appelé "graphqlRequest"
/*
import graphqlRequest from "./graphqlRequest";

// Query pour obtenir une liste d'article pour le contenue des archives de `pages\blog\index.js`
export default async function getPostList*/(endCursor = null) /*{*/
  const condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}}`;
/*
  // Définitions de la requette GraphQL
  const query = {
    query: `query getAllPosts {
        posts*/(${condition})/* {
          nodes {
            title
            date
            slug
            excerpt(format: RENDERED)
            featuredImage {
              node {
                mediaDetails {
                  file
                  sizes {
                    sourceUrl
                    width
                    height
                  }
                }
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }`,
  };

  // Lance la Query en tant que requette HTTP grace a graphqlRequest
  const resJson = await graphqlRequest(query);
  // Extrait les donnée de la réponse
  const allPosts = resJson.data.posts;

  // Ajoutez des logs pour afficher les données extraites
  console.log("Toutes les publications extraites : ", allPosts);

  // Retourner la liste des publications
  return allPosts;
}

// Query Pour obtenir les informations des articles affiché dans `pages\blog\[postSlug].js`
export async function getSinglePost(slug) {
  // Définitions de la Query
  const query = {
    query: `query getSinglePost {
            post(id: "${slug}", idType: SLUG) {
              content(format: RENDERED)
              date
              excerpt(format: RENDERED)
              modified
              slug
              title(format: RENDERED)
              featuredImage {
                node {
                  mediaDetails {
                    sizes {
                      sourceUrl
                      width
                      height
                    }
                  }
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }`,
  };

  // Lancement de la query comme requette HTTP et récupération de la réponse
  const resJson = await graphqlRequest(query);
  {
    const singlePost = resJson.data.post;
    return singlePost;
  }
}

//Récupération du slug des slug de chaque publication
export async function getPostSlugs() {
  const query = {
    query: `query getPostSlugs {
            posts {
              nodes {
                slug
              }
            }
          }`,
  };
  const resJson = await graphqlRequest(query);
  const slugs = resJson.data.posts.nodes;
  return slugs;
}
```

Creation de `components\LoadMore.js` pour creer le boutton load more.

Puis implementer un useState dans `pages\blog\index.js`
Ajouter dans la fonction BlogHome
`const [posts, setPosts] = useState(allPosts);`

puis renommé `allPosts.nodes.map((post)` en `posts.nodes.map((post)` pkoi ???

Ensuite retourné dans `components\LoadMore.js`
Passé en argument `{posts, setPost}` dans la **function LoadMore**

Retourner dans l'index pour ajouter les argument a `<LoadMore posts={posts} setPosts={setPosts} />`

Ajouter l'évenement handleOnClick dans `components\LoadMore.js`

Puis on parrametre le **const handleOnClick**

```js
import { getPostList } from "../lib/posts";

export default function LoadMore({ posts, setPosts }) {
  const handleOnClick = async (event) => {
    let clickedBtn = event.target;
    const morePosts = await getPostList(posts.pageInfo.endCursor);
    let updatedPosts = {
      pageInfo: {},
      nodes: [],
    };

    updatedPosts.pageInfo = morePosts.pageInfo;

    posts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    morePosts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    setPosts(updatedPosts);
  };
  return (
    <button
      className="load-more font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
      onClick={handleOnClick}
    >
      Load more posts
    </button>
  );
}
```

##### To finish 19:42

Le boutton LoadMore charge les pages en boucle c'est pourquoi je vais créer la conditions qui permet de faire en sorte que le boutton n'affiche que load more post

Pour cela on initialise le useState dans `components\LoadMore.js`

- import du useState
- déclaration de l'état initial du useState avec le texte "LoadMore" et l'etat inactif du boutton regler sur False.
- Quand le boutton est cliqué Configuration du texte "Loading..." est setDisabled sur True pour le rendre uncliquable
- Mis a jour de la valeur du boutton apres chargement grace a une conditions déclenché par la promesse de getPostList qui dis si il y a encore des post a chargé.

```js
/*
import { getPostList } from "@/lib/posts";*/
import { useState } from "react";
/*
export default function LoadMore({ posts, setPosts }) {
    */
const [buttonText, setButtonText] = useState("Load more posts");
const [buttonDisabled, setButtonDisabled] = useState(false);
/*
  const handleOnClick = async (event) => {
    let clickedBtn = event.target;
*/
setButtonText("Loading...");
setButtonDisabled(true);
/*
    const morePosts = await getPostList(posts.pageInfo.endCursor);
    let updatedPosts = {
      pageInfo: {},
      nodes: [],
    };

    updatedPosts.pageInfo = morePosts.pageInfo;

    posts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    morePosts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    setPosts(updatedPosts);
*/
if (morePosts.pageInfo.hasNextPage) {
  setButtonText("Load more posts");
  setButtonDisabled(false);
} else {
  setButtonText("No more posts to load");
  setButtonDisabled(true);
}
/* };
  return (
    <button
      className="load-more font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
      onClick={handleOnClick}
      disabled={buttonDisabled}
    >*/
{
  buttonText;
}
/*</button>
  );
}*/
```

### Creation de la page d'archive ( categorie )

on vas dans `pages\category\[categoryName].js`
et on importe

- FeaturedImage
- Head
- Link
- LoadMore
- SiteFooter
- SiteHeader

Ensuite on prepare nos function **getStaticPaths** et **getStaticProps**

Ajout de la fonction **getCategorySlugs** dans `lib\posts.js` pour y placer la query

```js
export async function getCategorySlugs() {
  const query = {
    query: `query getCategorySlugs {
            categories {
              nodes {
                slug
              }
            }
          }`,
  };

  const resJson = await graphqlRequest(query);
  const categorie = resJson.data.categories.nodes;

  return categories;
}
```

ajout de `taxanomy = null` dans la fonction **getPostList** car la category est une taxonomy de wordpress

ajout de la condition pour filtrer et trier le contenue que l'on veut

```js
if (taxonomy) {
  condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}, ${taxonomy.key}: "${taxonomy.value}"}`;
}
```

Ensuite je retroune dans `pages\category\[categoryName].js`
pour remplire mettre le await **getPostList** dans le async **getStaticProps** afin de injecter les categoryPost dans le site Static générer depuis wordpress.

```js
export async function getStaticProps({ params }) {
  const categoryPosts = await getPostList(null, {
    key: "categoryName",
    value: params.categoryName,
  });

  return {
    props: {
      categoryPosts: categoryPosts,
    },
  };
}
```

création de la fonction `getCategoriesDetails(categoryName)` pour retourner les details comme le nom et le slug d'une categorie.

Puis on retourne sur `pages\category\[categoryName].js` pour ajouter **const getCategoryDetails** dans la **function getStaticProps**

Faire le JSX du composant
mentionner le useState`const [posts, setPosts] = useState(categoryPosts);` dans le JSX sans oublié de changer le parametre. Le

On importe le composant Date pour formatter les dates

retourner dans `lib\posts.js` pour modifier la query pour ajouter ` category(id: "${categoryName}", ...`
On a egalement change le idType de la query en SLUG

```js
export async function getCategoryDetails(categoryName) {
  const query = {
    query: `query getCategoryDetails {
                category(id: "${categoryName}", idType: SLUG) {
                  count
                  name
                  slug
                }
              }`,
  };
```

ensuite on ajoute le boutton LoadMore dans le JSX de `pages\category\[categoryName].js`

```js
<LoadMore
  posts={posts}
  setPosts={setPosts}
  taxonomy={{
    key: "categoryName",
    value: categoryDetails.slug,
  }}
/>
```

Ensuite au retourne sur `components\LoadMore.js`
pour ajouter le parametre `taxonomy` dans la const **morePost** pour ???

`const morePosts = await getPostList(posts.pageInfo.endCursor, taxonomy);`

Cependant si je clique sur le boutton ...
il faut modifier le state du boutton dans `components\LoadMore.js` en ajoutant des condition sur le boutton

```js
/* return (
    <button
      className="load-more font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
      onClick={handleOnClick}
      disabled=*/ {
  posts.pageInfo.hasNextPage ? buttonDisabled : true;
}
//>
{
  posts.pageInfo.hasNextPage ? buttonText : "No more posts to load"; /*}
    </button>
  );*/
}
```

### Authentification JWT

On dois ajouter ce code graphQL que l'on telecharge en zip sur github https://github.com/wp-graphql/wp-graphql-jwt-authentication

Récuperer une Auth_KEY dans https://api.wordpress.org/secret-key/1.1/salt/

et ajouter dans `wp-config.php` 'GRAPHQL_JWT_AUTH_SECRET_KEY' suivie de la clé récupéré sur le github

```php
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'K?>G)6Sjoov=|,Az5i-%Q.LA1@D@2icap4}/qAb-NxB^9S(3]9Q=(u(Hm?{S5)l:' )
```

Ensuite on ouvre la Query Composer
Et on clique sur Add Nex Mutation
une mutation est une opération qui permet de modifier les données sur le serveur

Pour cela dans le QueryComposer
Login

- input
  client = uniqueId
  password = "passowrd"
  username = nextjs_user
  refreshtoken

```php
mutation LoginMutation {
 login(input: {password: "password", username: "nextjs_user", clientMutationId: "uniqueId"}) {
   refreshToken
 }
}
```

ce qui dois retourner les data
et on copie la valeur de refreshToken

puis on la colle dans le fichier `env.local`pour définir la valeur de
`WORDPRESS_AUTH_REFRESH_TOKEN=`

Ensuite on ajoute dans `lib\graphqlRequest.js`

```js
//Permet d'ajouter une authentification a une requette HTTP avec le Refresh_Token en utilisant le schéma "Bearer"
if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  headers[
    "Authorization"
  ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
}
```

Le code ci dessus est utile quand on clique sur
GraphQL > Settings > Restrict Endpoint to Authenticated user qui renvoi une erreur si il n'est pas activé.

### Ajouter un systeme de commentaire

On vas ajouter des commentaire aux article de blog via GraphQL
Les utilisateur y compris anonyme peuvent ajouter des commentaires
Avec leur nom, leur mail et leur commentaire.
Une fois envoyé ils sont soumis a approbation dans l'admi wordpress
Une fois qu'il est validé le nombre de commentaire sur le post augmente.

Il y a une notification pour dire que le commentaire est envoyé.
En cas d'echec il y a une alerte differentes.

Les commentaires sont soumis a Wordpress via une opérations de création (mutations) Wordpress.

#### Creation du composant comments.

Creation de `components\CommentForms.js` qui prend en props postID

Et une fonction handleSubmit qui `OnSubmit` récupere les information entré dans les champs dans une variable `let data`

```js
export default function CommentForm({ postId }) {
  const handleSubmit = async function (event) {
    event.preventDefault();

    let data = {
      author: event.target.author.value,
      authorEmail: event.target.authorEmail.value,
      content: event.target.content.value.replace(/\n/g, "\\n"),
      postId: event.target.postId.value,
    };

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <h3 className="text-2xl pb-4 mb-4 border-b">Add your toughts:</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="author">First Name :</label>
        <input type="text" id="author" name="author" required />

        <label htmlFor="authorEmail">Email:</label>
        <input type="email" name="authorEmail" id="authorEmail" required />

        <label htmlFor="constent">Message</label>
        <textarea name="content" id="content"></textarea>

        <input
          type="hidden"
          name="postId"
          id="postId"
          value={postId}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
```

Et import de ce composant dans `pages\blog\[postSlug].js` en ajoutant un container pour receptionner le formulaire de commentaire

Puis on ajoute le field **databaseId** dans la query **getSinglePost** present dans `lib\posts.js` pour lier le post au formulaire de commentaire avec son identifiant unique du post.

```js
// Query Pour obtenir les informations des articles affiché dans `pages\blog\[postSlug].js`
//export async function getSinglePost(slug) {
  // Définitions de la Query
  const query = {
    /*query: `query getSinglePost {
            post(id: "${slug}", idType: SLUG) {
              content(format: RENDERED)
              date
              excerpt(format: RENDERED)
              modified
              slug
              title(format: RENDERED)
              */databaseId/*
              featuredImage {
                node {
                  mediaDetails {
                    sizes {
                      sourceUrl
                      width
                      height
                    }
                  }
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }`,
  };*/
```

#### Récupération des donnée a envoyer dans une requete POST

Puis on récupère les valeur entré par l'utilisateur dans le formulaire pour les envoyé au serveur VIA une requete POST `components\CommentForms.js`

#### Traitement de la requette HTTP

Puis on créer le point de terminaison API dans en créant `pages\api\comment.js` pour gérer les requette HTTP ( transformation du corps de la requette en JSON, gestion des erreurs, mutation pour ajouter la data dans le back office de wordpress ... )

#### Muter les data pour les ajouté dans la base de donnée

Ensuite les data doivent etre envoyé comme une mutation graphQL dans le fichier qu'on créé `lib\comments.js`

Une fois les data selectionné on ajoute les variable dans la mutation

```js
import graphqlRequest from "./graphqlRequest";

export async function createComment(body) {
  const mutation = {
    query: `mutation CreateComment(
        $author: String = "${body.author}", 
        $authorEmail: String = "${body.authorEmail}", 
        $clientMutationId: String = "uniqueId", 
        $commentOn: Int = ${parseInt(body.postId)}, 
        $content: String = "${body.content}") {
            createComment(
              input: {author: $author, 
                authorEmail: $authorEmail, 
                clientMutationId: $clientMutationId, 
                commentOn: $commentOn, 
                content: $content
            }
            ) {
              success
            }
          }`,
  };
  const resJson = await graphqlRequest(mutation);
  return resJson;
}
```

Ensuite on envoi tout dans un resJson que l'on apelle dans `pages\api\comment.js` avec un await

```js
/*
import { createComment } from "@/lib/comments";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  if (!body.author || !body.authorEmail || !body.content) {
    return res.status(400).json({ message: "Required fields missing" });
  }
*/

  // Construction de la mutation
  const resJson = await createComment(body);

  if (resJson.errors) {
    return res.status(500).json({ message: resJson.errors[0].message });
  } else if (
    resJson.data.createComment !== null &&
    resJson.data.createComment.success === true
  ) {
    return res
      .status(200)
      .json({ message: "Your comment is awaiting approval" });
  }
  return res.status(500).json({ message: "Some error occured" });
}
```

Ensuite pour créer l'alerte dans le template `components\CommentForms.js`
Pour cela on commence par créer 3 variable
une variable useState qu'on interroge avec un boolean
une variable pour réponse qui contiendra le message ecrit par le backend
Et une variable pour la couleur du message de l'alerte

Ensuite on ajoute initialise les valeur de chaque set quand l'utilisaateur clique

Sauf la reponse qu'on initalise a la fin de la fonction du genstionnaire d'evenement clique, qui verifie si tout est ok ou non est on définis la valeur en conditions pour la couleur de l'alerte

```js
import { useState } from "react";

//export default function CommentForm({ postId }) {
const [submitStatus, setSubmitStatus] = useState(false);
const [responseMessage, setResponseMessage] = useState("");
const [alertColor, setAlertColor] = useState("");
/*
  const handleSubmit = async function (event) {
    event.preventDefault();
*/
setSubmitStatus(true);
setResponseMessage("Your Comment is being submitted ...");
setAlertColor("bg-yellow-500");
/*
    let data = {
      author: event.target.author.value,
      authorEmail: event.target.authorEmail.value,
      content: event.target.content.value.replace(/\n/g, "\\n"),
      postId: event.target.postId.value,
    };

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    setResponseMessage(result.message);
*/
if (response.ok) {
  setAlertColor("bg-green-500");
} else {
  setAlertColor("bg-red-500");
} /*
  };

  return (
    <>
      <h3 className="text-2xl pb-4 mb-4 border-b">Add your toughts:</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="author">First Name :</label>
        <input type="text" id="author" name="author" required />

        <label htmlFor="authorEmail">Email:</label>
        <input type="email" name="authorEmail" id="authorEmail" required />

        <label htmlFor="constent">Message</label>
        <textarea name="content" id="content"></textarea>

        <input
          type="hidden"
          name="postId"
          id="postId"
          value={postId}
          required
        />

        <button type="submit">Submit</button>
      </form>*/
{
  submitStatus && (
    <div className={`${alertColor} py-2 px-4 -mt-4 text-state-100 rounded md`}>
      {responseMessage}
    </div>
  );
} /*
    </>
  );
}
*/
```

Update on modifie egalement l'approche de récupération des valeur de
author
authorEmail
content
id
En utilisant une approche controlé grace au useState de react
(avant on utilisé une approche non controlé en accedant au valeur seulement au moment de la soumission du formulaire et que les valeurs n'etait pas suivie par react. ( elle etait géré directement par le DOM ) )

Maintenant Chaque fois que l'utilisateur modifie la valeur d'un champ, elle est mise à jour dans l'état correspondant via setAuthor.

```js
/*
import { useState } from "react";

export default function CommentForm({ postId }) {
  const [author, setAuthor] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(postId);
*/
  const [submitStatus, setSubmitStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
/*
  const handleSubmit = async function (event) {
    event.preventDefault();

    setSubmitStatus(true);
    setResponseMessage("Your Comment is being submitted ...");
    setAlertColor("bg-yellow-500");

    let data = {*/
      author: author,
      authorEmail: authorEmail,
      content: content.replace(/\n/g, "\\n"),
      postId: id,/*
    };

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    setResponseMessage(result.message);

    if (response.ok) {
      setAlertColor("bg-green-500");
      setAuthor("");
      setAuthorEmail("");
      setContent("");
    } else {
      setAlertColor("bg-red-500");
    }
  };

  return (
    <>
      <h3 className="text-2xl pb-4 mb-4 border-b">Add your toughts:</h3>

      <form className="comment-form" onSubmit={handleSubmit}>*/
       <label htmlFor="author">First Name :</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
        />

        <label htmlFor="authorEmail">Email:</label>
        <input
          type="email"
          name="authorEmail"
          value={authorEmail}
          id="authorEmail"
          onChange={(event) => setAuthorEmail(event.target.value)}
          required
        />

        <label htmlFor="content">Message</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        ></textarea>
/*
        <button type="submit">Submit</button>
      </form>
      {submitStatus && (
        <div
          className={`${alertColor} py-2 px-4 -mt-4 text-state-100 rounded md`}
        >
          {responseMessage}
        </div>
      )}
    </>
  );
}
*/
```

Maintenant nous voulons afficher les commentaire validé sur la page du blog

Pour cela on vas créer une nouvelle requete GraphQL nommé `getComments` dans `lib\comments.js` afin de récupérer :

- **slug** : Identifiant unique du post, utilisé pour récupérer les commentaires spécifiques à ce post.
- **commentCount** : Le nombre total de commentaires pour le post.
- **comments** : Les détails des commentaires du post, qui incluent :
  - **nodes** : Chaque commentaire, contenant :
    - **author** : L'auteur du commentaire, avec :
      - **node** : Contient des informations sur l'auteur, notamment :
        - **avatar** : L'avatar de l'auteur, avec des informations comme la **height** (hauteur).
    - **content** : Le contenu textuel du commentaire.
    - **date** : La date de publication du commentaire.
    - **parentId** : L'identifiant du commentaire parent, si le commentaire est une réponse à un autre commentaire.
    - **id** :

```js
export async function getComments(slug) {
  const query = {
    query: `query getComments {
        post(id: "${slug}", idType: SLUG) {
          commentCount
          comments(where: {parentIn: "null"}) {
            nodes {
              author {
                node {
                  avatar {
                    height
                  }
                }
              }
              content
              date
              parentId
              id
            }
          }
        }
      }`,
  };

  const resJson = await graphqlRequest(query);
  const comments = resJson.data.post.comments;
  const commentCount = resJson.data.post.commentCount;

  return {
    comments,
    commentCount,
  };
}
```

puis on vas dans `pages\blog\[postSlug].js` pour importer la fonction `import { getComments } from "@/lib/comments";`
pour retourner `const { comments, commentCount } = await getComments(params.postSlug);` dans les props

```js
return {
  props: {
    //postData,
    //featuredImageUrl: "url(" + featuredImageUrl + ")",*/
    comments,
    commentCount,
  },
};
```

afin de pouvoir les passer comme argument dans notre `export default function Post({ postData, featuredImageUrl, comments, commentCount })`

Maintenant nous voulons iterer le tableau de commentaire et afficher les commentaire avec la fonction map

pour pouvoir les utiliser dans notre retour JSX
dont voici le code de `pages\blog\[postSlug].js`

PS : contrairement au tuto
J'ai egalement ajouter le mode <Image> au lieu de img pour appeler les image et j'ai ajouter le domaine 1gravatar.com dans next.config.js pour appeler les image depuis ce domaine

```js
/*
Affiche un article indiduel coté front
*/
/*
import { getPostSlugs, getSinglePost } from "@/lib/posts";

import CommentForm from "@/components/CommentForm";
import Date from "@/components/Date";
import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";*/
import { getComments } from "@/lib/comments";

// Fonction pour obtenir les propriétés statiques de la page
/*
export async function getStaticProps({ params }) {
  // Obtient les données de la publication spécifique en utilisant le slug
  const postData = await getSinglePost(params.postSlug);
  const { comments, commentCount } = await getComments(params.postSlug);
  // URL de l'image a la une par defaut
  let featuredImageUrl =
    "http://nextjs-test1.com/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

  // Vérifie si l'URL de l'image à la une existe dans les données de la publication
  if (postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl) {
    featuredImageUrl =
      postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  }

  return {
    props: {
      postData,
      featuredImageUrl: "url(" + featuredImageUrl + ")",*/
      comments,
      commentCount,/*
    },
  };
}

// Fonction pour déterminer les chemins possibles des pages dynamiques
export async function getStaticPaths() {
  // Obtient la liste des slugs de toutes les publications (cf lib/posts.js)
  const postSlugs = await getPostSlugs();
  // Obtient la liste des slugs de toutes les publications
  return {
    paths: postSlugs.map((s) => ({
      params: {
        postSlug: s.slug,
      },
    })),
    fallback: false,
  };
}

// Composant principal de la page de publication unique
export default function Post({
  postData,
  featuredImageUrl,*/
  comments,
  commentCount,/*
}) {
  return (
    <>
      <Head>
        <title key={postData.slug}>{postData.title}</title>
        <meta
          name="description"
          content={postData.excerpt}
          key="metadescription"
        />
      </Head>
      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="header-single-post z-10 relative"></SiteHeader>
      </section>
      <article>
        <section
          className="hero-area h-[60vh] min-h-[30rem] bg-norepeat bg-coder bg-center relative"
          style={{ backgroundImage: featuredImageUrl }}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
          <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
            <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-12">
              {postData.title}
            </h1>

            <div className="pb-4 text-slate-100 z-10">
              Posted By Wilou, latest Update On{" "}
              <Date dateString={postData.modified} />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: postData.excerpt }}
              className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"
            ></div>
          </div>
        </section>
        <section className="content-area py-8">
          <div
            dangerouslySetInnerHTML={{ __html: postData.content }}
            className="post-content max-w-4xl mx-auto"
          />
        </section>
      </article>
      <div className="container mx-auto lg:max-w-4xl">*/
        <h3 className="text-xl py-2 my-4 border-l-4 border-l-lime-300">
          {commentCount ? commentCount : "No"}
        </h3>/*
        <CommentForm postId={postData.databaseId} />
      </div>
      <div className="container mx-auto lg:max-w-4xl">*/
        <section>
          <ul>
            {comments.nodes.map((comment) => (
              <li key={comment.id}>
                <div className="comment-header flex justify-start items-center">
                  <div className="py-4">
                    <Image
                      src={
                        comment.author.node.avatar
                          ? comment.author.node.avatar.url
                          : "defaultAvatarUrl"
                      }
                      width={
                        comment.author.node.avatar
                          ? comment.author.node.avatar.width
                          : "defaultWidth"
                      }
                      height={
                        comment.author.node.avatar
                          ? comment.author.node.avatar.height
                          : "defaultHeight"
                      }
                      alt=""
                      className="rounded-full max-w-[50px] mr-4"
                    />
                    <div>
                      <div className="font-bold">{comment.author.name}</div>
                      <div className="text-sm">
                        <Date dateString={comment.date} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="comment-body">
                  <div
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>/*
      </div>

      <SiteFooter />
    </>
  );
}

```

Pour résumé afin d'implémenter un systeme de commentaire dans NextJS + WpHeadless il faut.

On utilise la librairie [joi](https://github.com/hapijs/joi) pour effectué des verification sur les data evoyé.

### Revalidation avec NextJS

Quand on modifie un article sur Wordpress, au lieu de recompiler tout le site on utilise la régénération statique incrémentielle et de la revalidation à la demande.

Avec la régénération statique incrémentielle, on génère initialement un ensemble de pages, puis on génère les futures pages de manière incrémentielle. La revalidation à la demande permet de mettre à jour une page individuelle sans régénérer tout le site. Cela se fait en utilisant la fonction revalidate de Next.js.

Un plugin appelé "Frontend Notifier" est introduit. Ce plugin surveille les mises à jour de contenu et envoie une requête HTTP au serveur front-end. Il nécessite l'ajout de constantes spécifiques dans le fichier wp-config.php pour installer et activer le plugin.

un point de terminaison d'API est créé pour recevoir les notifications du backend WordPress. Un fichier revalidate.js est créé dans le répertoire API de Next.js, qui extrait le slug de la requête et vérifie un jeton secret pour la sécurité.

https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration

---

Le plugin Frontend-notifier pour surveiller les mise a jour de contenu

https://github.com/iabhinavr/frontend-notifier : Le telecharger comme plugin et l'installer

récupérer

```php
define( 'FN_SECRET_KEY', 'fghoregdb43573sd'); // change the value to your secret key
define( 'FN_URL', 'https://example.com/api/revalidate'); // change the url to your frontend API endpoint URL
```

Et les coller dans config.php et changer la secret key ( un truc au hasard ) et la sauvegarder dans un coin

ainsi que le endpoint pour mettre le bon nom de domaine ( l'url )

Une fois qu'on a configurer le tout quand on modifie un article, il est notifié dans le plugin Frontend Notifier.

Si on observe le plugin dans le fichier **frontend-notifier/data/update_data**.json on voit qu'il contient le code générer à chaque modification.

Maitenant on créé nos endpoint sur `pages\api\revalidate.js`
On regarde la clas **$data** dans **frontend-notifier/admin/class-frontend-notifier.php** pour voir quoi récupérer.

4'30

#### Bug rencontré pendant la creation du systeme de commentaire

J'essaie de créer un systeme de commentaire avec wpheadless + nextjs pour ça j'ai :

un composant nextJS commentForm.js
il recupere les donnée écrit en front end pour les envoyer dans une requete POST

export default function CommentForm({ postId }) {
const handleSubmit = async function (event) {
event.preventDefault();

    let data = {
      author: event.target.value,
      authorEmail: event.target.authorEmail.value,
      content: event.target.content.value.replace(/\n/g, "\\n"),
      postId: event.target.postId.value,
    };

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

};

return (
<>

<h3 className="text-2xl pb-4 mb-4 border-b">Add your toughts:</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="author">First Name :</label>
        <input type="text" id="author" name="author" required />

        <label htmlFor="authorEmail">Email:</label>
        <input type="email" name="authorEmail" id="authorEmail" required />

        <label htmlFor="constent">Message</label>
        <textarea name="content" id="content"></textarea>

        <input
          type="hidden"
          name="postId"
          id="postId"
          value={postId}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </>

);
}

La requete POST receptionne les data dans un point de terminaison API api/comment.js afin de verifier si il n'y a as d'erreur.

Et de construire la mutation pour ajouter le commentaire dans le backoffice wordpress

grace a lib/comment.js
import graphqlRequest from "./graphqlRequest";

export async function createComment(body) {
const mutation = {
query: `mutation CreateComment(
        $author: String = "${body.author}", 
        $authorEmail: String = "${body.authorEmail}", 
        $clientMutationId: String = "uniqueId", 
        $commentOn: Int = ${parseInt(body.postId)}, 
        $content: String = "${body.content}") {
            createComment(
              input: {author: $author, 
                authorEmail: $authorEmail, 
                clientMutationId: $clientMutationId, 
                commentOn: $commentOn, 
                content: $content
            }
            ) {
              success
            }
          }`,
};
const resJson = await graphqlRequest(mutation);
return resJson;
}

Cependant quand je vais sur le front est que je remplis tout les champs du formulaire la console me renvoi
"Required fields missing"

### Probleme

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

## Vocabulaire

`getStaticProps`
`getStaticPaths`

**la régénération statique incrémentielle (ISR)**
Pour utiliser la génération statique sans avoir besoin de reconstruire tout le site.

**la revalidation à la demande**

## Question

C'est quoi la différence entre Rendered et Raw quand on selectionne des truc dans le QueryComposer

Dans `lib\posts.js` pourquoi les fonction `getSinglePost` et `getPostSlugs` sont séparé ?
Peut etre pour réutilisé les slug de l'article sans récupérer toutes les autres données.

Comments les étapes pour définir les routes dynamiques via les fonctions "getStaticPaths" et "getStaticProps" ont été détaillée ?

fonction "getStaticPaths" est chargée de définir la liste des valeurs possibles pour le paramètre d'URL "page-slug"

La fonction "getStaticProps" est destinée à récupérer les données de la page actuelle en fonction du chemin de l'URL

## BUG

Je n'arrive pas a afficher l'image a la une lié a un article depuis ma query GraphQL
a la place j'ai l'image par default qui s'affiche
Pourtant quand je log je récupère bien l'URL de l'image de chaque article

L'image est sensé être affiché par le composant <FeaturedImage> dans mon template de page
`pages\blog\index.js`

```js
import FeaturedImage from "@/components/FeaturedImage";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import getAllPosts from "@/lib/posts";

/* Fonction asynchrone pour récupérer les données des articles */
export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts: allPosts,
    },
  };
}

/* Définition du composant principal de la page de blog */
export default function BlogHome({ allPosts }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        <SiteHeader className="header-blog-home z-10 relative" />
        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
          BLOG
        </h1>
        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Read our latest articles
        </p>
      </div>
      <main>
        <section className="post-list mt-4">
          <ul>
            {/* Mapping de la liste des articles récupérée */}
            {allPosts.nodes.map((post) => (
              <li key={post.slug} className="grid grid-col-5 gap-4 mb-4">
                <div className="col-span-2">
                  {/* Affiche de l'image à la une de l'article */}
                  <FeaturedImage post={post} />
                  {/*console.log(
                    post.featuredImage.node.mediaDetails.sizes[0].sourceUrl
                  )*/}
                </div>
                <div className="col-span-3">
                  <h2 className="py-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-400 text-2xl"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {/* affiche le contenu de l'extrait d'un article de manière sécurisée en utilisant React */}
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  ></div>
                  {/* affiche les categories de l'article avec un liens*/}
                  <div>
                    Posted under {/* affiche post under ou publié sous*/}
                    {post.categories.nodes.map((category) => (
                      <Link
                        href={`/category/${category.slug}`}
                        key={category.slug}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
```

`components\FeaturedImage.js`

```js
import Image from "next/image";
import Link from "next/link";

// Composant fonctionnel "FeaturedImage" qui prend un objet "post" en tant que paramètre
export default function FeaturedImage({ post }) {
  let img = "";

  // URL de l'image par défaut en cas de manque d'image dans "post"
  const defaultFeaturedImage =
    "http://nextjs-test1.com/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

  // Dimensions par défaut pour l'image
  const defaultWidth = "300";
  const defaultHeight = "200";

  // Affiche les données de post pour le débogage
  console.log("Données de post :", post);
  console.log(post.featuredImage);
  console.log("url" + post.featuredImage.node.mediaDetails.sizes[0].sourceUrl);

  // Vérifie si "post" a une image en vedette ("FeaturedImage")
  if (post.FeaturedImage) {
    // Si oui, récupère la première taille de l'image dans les détails multimédias
    let size = post.FeaturedImage.node.mediaDetails.sizes[0];
    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
    };
    // Si "post" n'a pas d'image en vedette, utilise l'image et les dimensions par défaut
  } else
    img = {
      src: defaultFeaturedImage,
      width: defaultWidth,
      height: defaultHeight,
    };
  // Retourne un composant "Link" de Next.js avec une image liée
  return (
    <Link href={`/blog/${post.slug}`}>
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={post.title}
      />
    </Link>
  );
}
```

```js
export default async function graphqlRequest(query) {
  // URL de l'API GraphQL que nous allons interroger
  const url = "http://nextjs-test1.com/graphql";
  // En-têtes de la requête HTTP pour spécifier que nous envoyons des données au format JSON.
  const headers = { "Content-Type": "application/json" };

  // Effectue une requête POST asynchrone vers l'URL spécifiée avec les en-têtes
  // et le corps de la requête fournis.
  const res = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  // Attend la réponse de la requête HTTP et la convertit en objet JSON.
  const resJson = await res.json();
  // Retourne la réponse JSON. Notez que cette fonction est asynchrone,
  // ce qui signifie qu'elle renvoie une promesse résolue avec la réponse JSON.
  return resJson;
}
```

Et mon `next.config.js`

```js
{
  /*
- next/image pour effectuer un certain nombre de vérifications pour s'assurer que les images sont sûres et provenant de sources approuvées.
- remotePatterns vous permet de spécifier les modèles d'URLs d'images distantes qui sont autorisés dans votre application.
*/
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, //option qui aide à identifier des problèmes potentiels dans votre application
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nextjstest1.local",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
```

// SOLUTION
C'etait une erreur de case avec FeaturedImage qui enfaite est définis comme featuredImage dans la condition de lib\posts.js

Cependant je rencontre une erreur dans le sens ou la photo par default prend en compte le width a 300px alors que les images associé a l'article sont a 900px.

Savez vous pourquoi ?

### Librairie utilisé

[joi](https://github.com/hapijs/joi) : Pour verifier les donné envoyé ( dans le systeme de commentaire )

### Mes articles

#### La différence entre une mutation et une query

- Une query dans GraphQL est utilisée pour lire ou récupérer des données. Elle est analogue à un GET dans les API REST.
- Les mutations sont utilisées pour écrire, modifier ou supprimer des données. Elles sont analogues aux méthodes POST, PUT, PATCH, et DELETE dans les API REST. Les mutations permettent de créer, mettre à jour ou supprimer des éléments dans la base de données.

#### Creer un formulaire

pour créer un formulaire WP headless nextJS

Création d'un composant stocker dans `/pages`
avec :

Le formulaire html

Le gestionnaire de formulaire déclenché lors de la soumission du formulaire avec **onSubmit**

- mentionner les donnée a extraire
- parser en JSON les donnée extraite
- mentionner la route API apeller avec une requete post dans await pour attendre la réponse

Creation du gestionnaire de requette HTTP dans un fichier a part stocker dans `pages/api`
pour verifier si il y a une erreur ou si le formulaire est envoyé avec succes.

- Creation du useState pour mettre a jour l'état en fonction de la réponse en prenant en compte
  - l'etat de la soumission (True / false ) déclenché par la prop par default onSubmit de react
  - l'etat du message ( stocker dans la reponse de l'api)
  - l'etat de la couleur de l'alert ( grace a une class CSS )
