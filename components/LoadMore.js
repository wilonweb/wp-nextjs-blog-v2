import { getPostList } from "@/lib/posts";
import { useState } from "react";

export default function LoadMore({ posts, setPosts, taxonomy = null }) {
  // État initial du texte et de la désactivation du bouton
  const [buttonText, setButtonText] = useState("Load more posts");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Fonction appelée lorsqu'on clique sur le bouton
  const handleOnClick = async (event) => {
    // Récupère le bouton cliqué
    let clickedBtn = event.target;

    // Met à jour le texte du bouton pendant le chargement
    setButtonText("Loading...");
    // Désactive le bouton pendant le chargement
    setButtonDisabled(true);

    // Récupère plus de posts depuis l'API
    const morePosts = await getPostList(posts.pageInfo.endCursor, taxonomy);
    let updatedPosts = {
      pageInfo: {},
      nodes: [],
    };

    // Met à jour les informations des pages pour la pagination
    updatedPosts.pageInfo = morePosts.pageInfo;

    // Copie les anciens nœuds de posts
    posts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    // Ajoute les nouveaux nœuds de posts
    morePosts.nodes.map((node) => {
      updatedPosts.nodes.push(node);
    });

    // Met à jour les posts avec les nouveaux posts
    setPosts(updatedPosts);

    // Vérifie s'il y a plus de pages à charger
    if (morePosts.pageInfo.hasNextPage) {
      // Met à jour le texte du bouton et réactive le bouton
      setButtonText("Load more posts");
      setButtonDisabled(false);
    } else {
      // Met à jour le texte du bouton et désactive le bouton
      setButtonText("No more posts to load");
      setButtonDisabled(true);
    }
  };
  return (
    <button
      className="load-more font-bold bg-blue-400 text-slate-900 px-4 py-2 hover:bg-blue-500"
      onClick={handleOnClick}
      disabled={posts.pageInfo.hasNextPage ? buttonDisabled : true}
    >
      {posts.pageInfo.hasNextPage ? buttonText : "No more posts to load"}
    </button>
  );
}
