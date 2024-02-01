### Ajouter un systeme de commentaire

#### ToDo

Créer un systeme de réponse au commentaire poster par un utilisateur.

#### Etapes

Pour ajouter un systeme de commentaire dans la stack Wordpress + NextJS + GraphQL ou meme les utilisateur anonyme peuvent poser un commenaire il faut :

un formulaire avec nom + email + contenue du commentaire.

Une fois envoyé on verifie les erreur pour dire si il a été soumis ou pas a travers une alerte qui mentionne qu'il faut que l'administrateur valide le commentaire en cas de succes.

Une fois qu'il a été validé il faut incrémenter le nombre de commenaire et affiché les info de l'utilisateur.
( Nom, Avatar)

Pour cela on commencer par créer le composant `components\CommentForms.js` avec une fonction qui prend pour déclarer `export default function CommentForm({ postId })`

Dans laquel on déclare dans le **useState** pour prendre en comptes les **data** et on les envoie au serveur avec une **requete POST** lors du **onSubmit**

##### Traitement de la requette HTTP

on créer le point de terminaison API dans en créant `pages\api\comment.js` pour gérer la requette HTTP

- Transformation du corps de la requette en JSON
- Gestion des erreurs
- mutation pour ajouter les data dans le backOffice

```js
const [author, setAuthor] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(postId);


  const handleSubmit = async function (event) {
    event.preventDefault();

    setSubmitStatus(true);
    setResponseMessage("Your Comment is being submitted ...");
    setAlertColor("bg-yellow-500");

    let data = {
      author: author,
      authorEmail: authorEmail,
      content: content.replace(/\n/g, "\\n"),
      postId: id,
    };
    ...}
```
