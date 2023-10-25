import Image from "next/image";
import Link from "next/link";

// Composant fonctionnel "FeaturedImage" qui prend un objet "post" en tant que paramètre
export default function FeaturedImage({ post }) {
  let img = "";

  // URL de l'image par défaut en cas de manque d'image dans "post"
  const defaultFeaturedImage =
    "http://nextjstest1.local/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

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
