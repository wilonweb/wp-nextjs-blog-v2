// Importe la fonction graphqlRequest depuis un module local appelé "graphqlRequest"

import graphqlRequest from "./graphqlRequest";

// Query pour obtenir une liste d'article pour le contenue des archives de `pages\blog\index.js`
export async function getPostList(endCursor = null, taxonomy = null) {
  let condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}}`;

  if (taxonomy) {
    condition = `after: "${endCursor}", first: 5, where: {orderby: {field: DATE, order: DESC}, ${taxonomy.key}: "${taxonomy.value}"}`;
  }

  // Définitions de la requette GraphQL
  const query = {
    query: `query getAllPosts {
        posts(${condition}) {
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
  const categories = resJson.data.categories.nodes;

  return categories;
}

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

  const resJson = await graphqlRequest(query);
  const categoryDetails = resJson.data.category;

  return categoryDetails;
}
