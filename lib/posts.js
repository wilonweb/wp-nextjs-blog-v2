import graphqlRequest from "./graphqlRequest";

export default async function getAllPosts() {
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

  const resJson = await graphqlRequest(query);
  const allPosts = resJson.data.posts;

  // Ajoutez des logs pour afficher les données extraites
  console.log("Toutes les publications extraites : ", allPosts);

  return allPosts;
}
