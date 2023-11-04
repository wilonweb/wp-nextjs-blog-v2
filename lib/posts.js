// Importe la fonction graphqlRequest depuis un module local appelé "graphqlRequest"

import graphqlRequest from "./graphqlRequest";

// Query pour obtenir une liste d'article pour le contenue des archives de `pages\blog\index.js`
export default async function getAllPosts() {
  // Définitions de la requette GraphQL
  const query = {
    query: `query NewQuery {
          posts {
            nodes {
              title
              date
              slug
              excerpt
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
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                }
              }
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
