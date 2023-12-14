/*
Affiche un article indiduel coté front
*/

import { getPostSlugs, getSinglePost } from "@/lib/posts";

import Date from "@/components/Date";
import Head from "next/head";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

// Fonction pour obtenir les propriétés statiques de la page
export async function getStaticProps({ params }) {
  // Obtient les données de la publication spécifique en utilisant le slug
  const postData = await getSinglePost(params.postSlug);
  // URL de l'image a la une par defaut
  let featuredImageUrl =
    "http://nextjs-test1.com/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

  // Vérifie si l'URL de l'image à la une existe dans les données de la publication
  if (postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl) {
    featuredImageUrl =
      postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  }

  return {
    props: {
      postData,
      featuredImageUrl: "url(" + featuredImageUrl + ")",
    },
  };
}

// Fonction pour déterminer les chemins possibles des pages dynamiques
export async function getStaticPaths() {
  // Obtient la liste des slugs de toutes les publications (cf lib/posts.js)
  const postSlugs = await getPostSlugs();
  // Obtient la liste des slugs de toutes les publications
  return {
    paths: postSlugs.map((s) => ({
      params: {
        postSlug: s.slug,
      },
    })),
    fallback: false,
  };
}

// Composant principal de la page de publication unique
export default function Post({ postData, featuredImageUrl }) {
  return (
    <>
      <Head>
        <title key={postData.slug}>{postData.title}</title>
        <meta
          name="description"
          content={postData.excerpt}
          key="metadescription"
        />
      </Head>
      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="header-single-post z-10 relative"></SiteHeader>
      </section>
      <article>
        <section
          className="hero-area h-[60vh] min-h-[30rem] bg-norepeat bg-coder bg-center relative"
          style={{ backgroundImage: featuredImageUrl }}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
          <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
            <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8 mt-12">
              {postData.title}
            </h1>

            <div className="pb-4 text-slate-100 z-10">
              Posted By Wilou, latest Update On{" "}
              <Date dateString={postData.modified} />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: postData.excerpt }}
              className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"
            ></div>
          </div>
        </section>
        <section className="content-area py-8">
          <div
            dangerouslySetInnerHTML={{ __html: postData.content }}
            className="post-content max-w-4xl mx-auto"
          />
        </section>
      </article>
    </>
  );
}
