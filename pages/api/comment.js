// Importation de la query depuis la fonction 'createComment' depuis le module '@/lib/comments' pour obtenier les data de la mutation

import { createComment } from "@/lib/comments";

//Gestionnaire de la requette HTTP
export default async function handler(req, res) {
  // récupération des donnée
  const body = JSON.parse(req.body);

  // Verification des champs requis
  if (!body.author || !body.authorEmail || !body.content) {
    // Si un champ requis est manquant, envoie d'une réponse d'erreur
    return res.status(400).json({ message: "Required fields missing" });
  }

  // Construction de la mutation pour créer un commentaire
  const resJson = await createComment(body);

  // Gestion des erreurs potentielles lors de la création du commentaire
  if (resJson.errors) {
    // En cas d'erreur, envoie d'une réponse d'erreur avec le message correspondant
    return res.status(500).json({ message: resJson.errors[0].message });
  } else if (
    // Vérification si la création du commentaire a réussi
    resJson.data.createComment !== null &&
    resJson.data.createComment.success === true
  ) {
    // Envoie d'une réponse de succès indiquant que le commentaire est en attente d'approbation
    return res
      .status(200)
      .json({ message: "Your comment is awaiting approval" });
  }
  // Si une autre erreur se produit, envoie d'une réponse d'erreur générique
  return res.status(500).json({ message: "Some error occured" });
}
