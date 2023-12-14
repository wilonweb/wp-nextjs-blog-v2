/*
encapsule la logique nécessaire pour effectuer une requête GraphQL 
via une requête HTTP POST vers l'API GraphQL spécifiée.
Elle est conçue pour être réutilisée pour interagir avec l'API GraphQL
*/
export default async function graphqlRequest(query) {
  // URL de l'API GraphQL que nous allons interroger
  const url = "http://nextjs-test1.com/graphql";
  // En-têtes de la requête HTTP pour spécifier que nous envoyons des données au format JSON.
  const headers = { "Content-Type": "application/json" };
  /*
  //Permet d'ajouter une authentification a une requette HTTP avec le Refresh_Token en utilisant le schéma "Bearer"
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }
*/
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
