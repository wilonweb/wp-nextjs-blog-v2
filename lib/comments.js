// Import du module GraphQLRequest permetant de traiter une requete GraphQL

import graphqlRequest from "./graphqlRequest";

// Fonction pour créer un commentaire
export async function createComment(body) {
  const mutation = {
    // Construction de la mutation GraphQL avec les données du corps de la requête
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
  // Envoi de la mutation à l'aide de la fonction 'graphqlRequest' et stockage de la réponse
  const resJson = await graphqlRequest(mutation);
  return resJson;
}

// Fonction asynchrone pour obtenir les commentaires
export async function getComments(slug) {
  // Construction de la requête GraphQL pour obtenir les commentaires
  const query = {
    query: `query getComments {
        post(id: "${slug}", idType: SLUG) {
          commentCount
          comments(where: {parentIn: "null"}) {
            nodes {
              author {
                node {
                  avatar {
                    url
                    height
                    width
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

  // Envoi de la requête à l'aide de la fonction 'graphqlRequest' et stockage de la réponse
  const resJson = await graphqlRequest(query);
  // Extraction des commentaires et du nombre de commentaires de la réponse
  const comments = resJson.data.post.comments;
  const commentCount = resJson.data.post.commentCount;

  // Retour des commentaires et du nombre de commentaires
  return {
    comments,
    commentCount,
  };
}
