// Gestionnaire de la requette HTTP envoyé par le formulaire de contact
export default function handler(req, res) {
  // Extrait le body de la requette
  const body = req.body;

  // Vérifier si des champs obligatoires (firstName, email et message) manquent dans le corps de la requête.
  if (!body.firstName || !body.email || !body.message) {
    return res
      .status(400)
      .json({ data: "first name, email, and message fields are required!" });
  }
  return res.status(200).json({ data: "form submitted successfully" });
}
